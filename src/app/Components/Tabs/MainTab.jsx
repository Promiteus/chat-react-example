import React, {useEffect, useState} from "react";
import {Tab, Tabs} from "@mui/material";
import TabItem from "./TabItem";
import ChatView from "../../Chat/ChatView";
import {CAPTION_CHATS, CAPTION_GUESTS, CAPTION_SEARCH } from "../../Constants/TextMessagesRu";
import {StompClient} from "../../Stores/api/Websocker/ws";
import {USER_ID_KEY} from "../../Stores/api/Common/ApiCommon";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AlertToast} from "../Modals/Toasts/AlertToast";
import {deleteUserAccountAsync} from "../../Stores/slices/UserSlice";
import {GuestsView} from "../../Guests";
import ResponsiveAppBar from "../../AppBar/ResponsitiveAppBar";
import SearchProfiles from "../../SearchProfiles/SearchProfiles";
import {ROUTE_SIGNUP} from "../../Constants/Routes";
import {selectCommon} from "../../Stores/slices/CommonSlice";
import ProfileDetail from "../../ProfileDetails/ProfileDetail";
import {userProfile} from "../../Stores/api/ChatDataApi/ChatDataApi";
import {Badge, ChatOutlined, DirectionsWalkOutlined, SearchOutlined} from "@mui/icons-material";
import useWindowDimensions from "../../Hooks/useWindowDimension";



function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

let stompClient = new StompClient();

const MainTab = (props) => {
    const [tabIndex, setTabIndex] = useState(0);
    const query = useQuery();
    const profileDispatch = useDispatch();
    const [showError, setShowError] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [profileData, setProfileData] = useState({data: {}, status: 0});
    const {pageIndex} = useSelector(selectCommon);
    const navigate = useNavigate();
    const {width} = useWindowDimensions();

    //Получить userId из параметра запроса или из локального хранилища.
    const currentUserId = !(query.get(USER_ID_KEY)) ? localStorage.getItem(USER_ID_KEY) : query.get(USER_ID_KEY);

    const handleChange = (event, newIndex) => {
        setTabIndex(newIndex);
    }

    useEffect(() => {
        if (pageIndex === -1) {
            setTabIndex(0);
        }
    }, [pageIndex]);

    /**
     * Обработчик ошибок при попытки получить профиль пользователя
     * @param {boolean} isDelete
     */
    function errorProfileHandler(isDelete= true) {
        //Удалить аккаунт пользователя только из сервиса авторизации
        if (isDelete) {
            profileDispatch(deleteUserAccountAsync({
                userId: currentUserId,
                isAccountOnly: true
            }));
        }
        navigate(ROUTE_SIGNUP);
    }


    //Реагирует однократно для userId
    useEffect(() => {
        if (currentUserId) {
            //Запросить данные профиля пользователя по userId
            userProfile(currentUserId)
                .then((res) => {
                    setProfileData({data: res?.data, status: res?.status});
                    if ((res?.status !== 200) && (res?.status !== 403)) {
                        errorProfileHandler(true);
                    } else if (+res?.status === 403) {
                        errorProfileHandler(false);
                    }
                })
                .catch((err) => {
                    errorProfileHandler(false);
                })
        } else {
            navigate(ROUTE_SIGNUP);
        }


        stompClient.tryStompConnect(stompClient, currentUserId, (error) => {
            setErrMsg(error);
            setShowError(true);
            setInterval(() => {setShowError(false)}, 5000);
        })

        return () => {
            stompClient?.disconnect();
        }
    }, []);


    //if (loading) return <Loader/>;

    return (
        <div>
            <ResponsiveAppBar user={profileData?.data?.userProfile}/>

            {/*Чат и поиск профиля*/}
            {((pageIndex === 0) || (pageIndex < 0)) &&
              <div className="container main-panel mt-2">
                {(width > 720) &&
                <div className="d-flex justify-content-center flex-row">
                    <Tabs className="align-items-center mt-1 mb-0"
                          value={tabIndex}
                          onChange={handleChange}
                          sx={{height: 40}}
                    >
                        <Tab icon={<ChatOutlined/>}
                             iconPosition={"start"}
                             sx={{color: "#6c34ef"}}
                             label={CAPTION_CHATS}
                             {...a11yProps(0)} />
                        <Tab icon={<DirectionsWalkOutlined/>}
                             iconPosition={"start"}
                             sx={{color: "#6c34ef"}}
                             label={CAPTION_GUESTS}
                             {...a11yProps(1)} />
                        <Tab icon={<SearchOutlined/>}
                             iconPosition={"start"}
                             sx={{color: "#6c34ef"}}
                             label={CAPTION_SEARCH}
                             {...a11yProps(2)} />
                    </Tabs>
                </div>}
                
                <TabItem value={tabIndex} index={0}>
                    <ChatView stomp={stompClient} userId={currentUserId} response={profileData?.data} />
                </TabItem>
                <TabItem value={tabIndex} index={1} >
                    <GuestsView visitors={profileData?.data?.lastVisitors || []} userId={currentUserId}/>
                </TabItem>
                <TabItem value={tabIndex} index={2} >
                    <SearchProfiles userId={currentUserId}/>
                </TabItem>

                {(width < 720) &&
                <div className="d-flex justify-content-center flex-row">
                    <Tabs className="align-items-center mt-0 mb-1" value={tabIndex} onChange={handleChange} sx={{height: 60}}>
                        <Tab icon={<ChatOutlined/>}
                             iconPosition={"start"}
                             sx={{color: "#6c34ef"}}
                             label={CAPTION_CHATS}
                             {...a11yProps(0)} />
                        <Tab icon={<DirectionsWalkOutlined/>}
                             iconPosition={"start"}
                             sx={{color: "#6c34ef"}}
                             label={CAPTION_GUESTS}
                             {...a11yProps(1)} />
                        <Tab icon={<SearchOutlined/>}
                             iconPosition={"start"}
                             sx={{color: "#6c34ef"}}
                             label={CAPTION_SEARCH}
                             {...a11yProps(2)} />
                    </Tabs>
                </div>}
              </div>}

            {/*Детали профиля*/}
            {pageIndex === 1 &&
              <div className="container main-panel mt-2">
                 <ProfileDetail profile={profileData?.data?.userProfile} currentUserId={currentUserId}/>
              </div>}

            <AlertToast text={errMsg} open={showError} success={false}/>
        </div>
    );
}

export default MainTab;