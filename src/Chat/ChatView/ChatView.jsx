import React, { useEffect, useState } from 'react';
//import ToastV1 from '../Components/Toasts/ToastV1/ToastV1';
import MessageSendView from '../MessageSendView/MessageSendView';
import MessageView from '../MessageView/MessageView';
import NameView from '../NameView/NameView';
import TopHeaderView from '../TopHeaderView/TopHeaderView';
import { StompClient } from '../Websocker/ws';
import './ChatView.css'
import Userlist from "../Users/UserList/UserList";
import {user_accounts} from "../TestData/TestConstants";
import {Container, Grid} from "@mui/material";
import {AlertToast} from "../../Componetns/Modals/Toasts/AlertToast";
import {useDispatch, useSelector} from "react-redux";
import {selectProfile, userProfileAsync} from "../../Stores/slices/UserProfileSlices";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {deleteUserAccountAsync} from "../../Stores/slices/UserSlice";
import {USER_ID_KEY} from "../../Stores/api/AuthApi/AuthApi";

let stompClient = new StompClient();

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ChatView ({props}) {
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const {response, status, error, loading } = useSelector(selectProfile);
  const profileDispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();

  //Получить userId из параметра запроса или из локального хранилища.
  const userId = query.get("userId") || localStorage.getItem(USER_ID_KEY);

  let users = user_accounts;

  //Реагирует на меняющийся статус запроса профиля пользователя
  useEffect(() => {

      console.log("ChatView response: "+JSON.stringify(response));
      console.log("ChatView status: "+status);
      console.log("localStorage.getItem(USER_ID_KEY): "+userId)

      if ((+status === 404) && (response)) {
           navigate('/registration');
      }

  }, [status]);

  //Реагирует однократно для userId
  useEffect(() => {
      stompClient?.connect();

      stompClient.connectionError = (error) => {
          setErrMsg(error);
          setShowError(true);
          setInterval(() => {setShowError(false)}, 5000);
      }

      if (userId) {
          //Запросить данные профиля пользователя по userId
          profileDispatch(userProfileAsync({userId}));
      }

      return () => {
          stompClient?.disconnect();
      }
  }, [userId]);



  return (
    <div  className="d-flex justify-content-center flex-column">
        <Container>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                    <div className="users h-100">
                        <Userlist users={users}/>
                    </div>
                </Grid>
                <Grid item xs={12} md={9}>
                    <div className="chat">
                        <TopHeaderView/>
                        <NameView />
                        <MessageView stomp={stompClient}/>
                        <MessageSendView stomp={stompClient} />
                    </div>
                </Grid>
            </Grid>
        </Container>
       <AlertToast text={errMsg} open={showError} success={false}/>
    </div>   
  );
}


export default ChatView;
