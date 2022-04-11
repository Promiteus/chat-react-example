import React, {useEffect, useState} from "react";
import {USER_ID_KEY} from "../Stores/api/Common/ApiCommon";
import {useLocation, useNavigate} from "react-router-dom";
import ProfileEditablePage from "../Componetns/ProfilePage/ProfileEditablePage";
import {Container} from "@mui/material";
import StandartHeader from "../Componetns/Header/StandartHeader";
import {ROUTE_HOME, ROUTE_SIGNUP} from "../Constants/Routes";
import {Helmet} from "react-helmet";
import {userProfile} from "../Stores/api/ChatDataApi/ChatDataApi";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

/**
 * Страница главного профиля
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MyProfile = (props) => {
    const query = useQuery();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({data: {}, status: 0});


    //Получить userId из параметра запроса или из локального хранилища.
    const currentUserId = !(query.get(USER_ID_KEY)) ? localStorage.getItem(USER_ID_KEY) : query.get(USER_ID_KEY);

    function onBack() {
        navigate(ROUTE_HOME);
    }

    useEffect(() => {
        if (currentUserId) {
            //Запросить данные профиля пользователя по userId
            userProfile(currentUserId)
                .then((res) => {
                    setProfileData({data: res?.data, status: res?.status});
                    if (res?.status !== 200) {
                        navigate(ROUTE_SIGNUP);
                    }
                })
                .catch((err) => {
                    navigate(ROUTE_SIGNUP);
                });
        } else {
            navigate(ROUTE_SIGNUP);
        }
    }, []);

    return(
        <>
            <Helmet>
                <title>Мой профиль</title>
            </Helmet>
            <div className="d-flex flex-column m-2 scroll-none">
                <Container className="my-profile my-profile-shadow d-flex flex-column">
                    <StandartHeader onClick={onBack}/>
                    <div className="d-flex scroll-y">
                        <ProfileEditablePage profile={profileData?.data?.userProfile} currentUserId={currentUserId} isEdit={currentUserId !== null}/>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default MyProfile;