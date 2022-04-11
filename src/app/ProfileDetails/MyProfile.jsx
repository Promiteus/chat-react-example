import React from "react";
import {USER_ID_KEY} from "../Stores/api/Common/ApiCommon";
import {useLocation, useNavigate} from "react-router-dom";
import ProfileEditablePage from "../Componetns/ProfilePage/ProfileEditablePage";
import {Container} from "@mui/material";
import StandartHeader from "../Componetns/Header/StandartHeader";
import {ROUTE_HOME} from "../Constants/Routes";
import {Helmet} from "react-helmet";

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

    //Получить userId из параметра запроса или из локального хранилища.
    const currentUserId = !(query.get(USER_ID_KEY)) ? localStorage.getItem(USER_ID_KEY) : query.get(USER_ID_KEY);

    function onBack() {
        navigate(ROUTE_HOME);
    }

    return(
        <>
            <Helmet>
                <title>Мой профиль</title>
            </Helmet>
            <div className="d-flex flex-column m-2 scroll-none">
                <Container className="my-profile my-profile-shadow d-flex flex-column">
                    <StandartHeader onClick={onBack}/>
                    <div className="d-flex scroll-y">
                        <ProfileEditablePage profile={currentUserId} currentUserId={currentUserId} isEdit={currentUserId !== null}/>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default MyProfile;