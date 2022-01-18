import React, {useEffect, useRef, useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import TabItem from "./TabItem";
import ChatView from "../../Chat/ChatView";
import {CAPTION_CHATS, CAPTION_GUESTS, CAPTION_SEARCH} from "../../Constants/TextMessagesRu";
import {StompClient} from "../../Chat/Websocker/ws";
import {USER_ID_KEY} from "../../Stores/api/Common/ApiCommon";
import {useLocation, useNavigate} from "react-router-dom";
import {dropStatus, selectProfile, userProfileAsync} from "../../Stores/slices/UserProfileSlices";
import {useDispatch, useSelector} from "react-redux";
import {AlertToast} from "../Modals/Toasts/AlertToast";
import {deleteUserAccountAsync} from "../../Stores/slices/UserSlice";
import Loader from "../Loader/Loader";
import {GuestsView} from "../../Guests";
import ResponsiveAppBar from "../../AppBar/ResponsitiveAppBar";
import SearchProfiles from "../../SearchProfiles/SearchProfiles";
import {ROUTE_REGISTRATION, ROUTE_SIGNUP} from "../../Constants/Routes";
import {selectCommon} from "../../Stores/slices/CommonSlice";
import ProfileDetail from "../../ProfileDetails/ProfileDetail";

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
let pattleHeight = 0;

const MainTab = (props) => {
    const [tabIndex, setTabIndex] = useState(0);
    const query = useQuery();
    const profileDispatch = useDispatch();
    const [showError, setShowError] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const {response, status, loading} = useSelector(selectProfile);
    const {pageIndex} = useSelector(selectCommon);
    const navigate = useNavigate();

    //Получить userId из параметра запроса или из локального хранилища.
    const currentUserId = !(query.get(USER_ID_KEY)) ? localStorage.getItem(USER_ID_KEY) : query.get(USER_ID_KEY);


    const handleChange = (event, newIndex) => {
        setTabIndex(newIndex);
    }


    //Реагирует на меняющийся статус запроса профиля пользователя
    useEffect(() => {
        if ((+status === 404) && !(response?.userProfile?.id) && (!loading)) {
            //Удалить аккаунт пользователя только из сервиса авторизации
            profileDispatch(deleteUserAccountAsync({
                userId: currentUserId,
                isAccountOnly: true
            }));
            navigate(ROUTE_REGISTRATION);
            //Сбросить статус на 0
            profileDispatch(dropStatus());
        } else if ((status === null) && (!loading)) {
            navigate(ROUTE_SIGNUP);
        }

    }, [status]);

    //Реагирует однократно для userId
    useEffect(() => {
        if (currentUserId) {
            //Запросить данные профиля пользователя по userId
            profileDispatch(userProfileAsync({userId: currentUserId}));
        }

        stompClient?.connect(currentUserId);

        stompClient.connectionError = (error) => {
            setErrMsg(error);
            setShowError(true);
            setInterval(() => {setShowError(false)}, 5000);
        }

        return () => {
            stompClient?.disconnect();
        }
    }, [currentUserId]);


    if (loading) return <Loader/>;

    return (
        <div>
            <ResponsiveAppBar user={response?.userProfile}/>

            {/*Чат и поиск профиля*/}
            {pageIndex === 0 &&
              <div className="container main-panel mt-2">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabIndex} onChange={handleChange} >
                        <Tab label={CAPTION_CHATS} {...a11yProps(0)} />
                        <Tab label={CAPTION_GUESTS} {...a11yProps(1)} />
                        <Tab label={CAPTION_SEARCH} {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabItem value={tabIndex} index={0}>
                    <ChatView stomp={stompClient} userId={currentUserId} response={response}/>
                </TabItem>
                <TabItem value={tabIndex} index={1} >
                    <GuestsView visitors={response?.lastVisitors || []}/>
                </TabItem>
                <TabItem value={tabIndex} index={2} >
                    <SearchProfiles profiles={[]}/>
                </TabItem>
              </div>}

            {/*Детали профиля*/}
            {pageIndex === 1 &&
              <div className="container main-panel mt-2">
                 <ProfileDetail profile={response?.userProfile}/>
              </div>}

            <AlertToast text={errMsg} open={showError} success={false}/>
        </div>
    );
}

export default MainTab;