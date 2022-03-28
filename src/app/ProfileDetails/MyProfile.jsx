import React from "react";
import {USER_ID_KEY} from "../Stores/api/Common/ApiCommon";
import {useLocation} from "react-router-dom";
import ProfileEditablePage from "../Componetns/ProfilePage/ProfileEditablePage";
import {Container} from "@mui/material";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const MyProfile = (props) => {
    const query = useQuery();

    //Получить userId из параметра запроса или из локального хранилища.
    const currentUserId = !(query.get(USER_ID_KEY)) ? localStorage.getItem(USER_ID_KEY) : query.get(USER_ID_KEY);

    return(
        <div className="d-flex flex-column h-100 m-2 ">
          <Container className="my-profile ">
              <div className="d-flex">
                  <ProfileEditablePage profile={currentUserId} currentUserId={currentUserId} isEdit={currentUserId !== null}/>
              </div>
          </Container>
        </div>
    );
}

export default MyProfile;