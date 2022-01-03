import React, { useEffect, useState } from 'react';
import MessageSendView from '../MessageSendView/MessageSendView';
import MessageView from '../MessageView/MessageView';
import NameView from '../NameView/NameView';
import TopHeaderView from '../TopHeaderView/TopHeaderView';
import { StompClient } from '../Websocker/ws';
import './ChatView.css'
import Userlist from "../Users/UserList/UserList";
import {Container, Grid} from "@mui/material";
import {AlertToast} from "../../Componetns/Modals/Toasts/AlertToast";
import {useDispatch, useSelector} from "react-redux";
import {dropStatus, selectProfile, userProfileAsync} from "../../Stores/slices/UserProfileSlices";
import {useLocation, useNavigate} from "react-router-dom";
import Loader from "../../Componetns/Loader/Loader";
import {deleteUserAccountAsync} from "../../Stores/slices/UserSlice";
import {USER_ID_KEY} from "../../Stores/api/Common/ApiCommon";

let stompClient = new StompClient();

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ChatView ({props}) {
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const {response, status, loading } = useSelector(selectProfile);
  const profileDispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();


  //Получить userId из параметра запроса или из локального хранилища.
  const userId = !(query.get(USER_ID_KEY)) ? localStorage.getItem(USER_ID_KEY) : query.get(USER_ID_KEY);


  //Реагирует на меняющийся статус запроса профиля пользователя
  useEffect(() => {
      if ((+status === 404) && !(response?.userProfile?.id) && (!loading)) {
          //Удалить аккаунт пользователя только из сервиса авторизации
           profileDispatch(deleteUserAccountAsync({
              userId: userId,
              isAccountOnly: true
           }));
           navigate('/registration');
           //Сбросить статус на 0
           profileDispatch(dropStatus());
      }

  }, [status]);

  //Реагирует однократно для userId
  useEffect(() => {
      if (userId) {
          //Запросить данные профиля пользователя по userId
          profileDispatch(userProfileAsync({userId}));
      }

      stompClient?.connect();

      stompClient.connectionError = (error) => {
          setErrMsg(error);
          setShowError(true);
          setInterval(() => {setShowError(false)}, 5000);
      }

      return () => {
          stompClient?.disconnect();
      }
  }, [userId]);

  if (loading) return <Loader/>;

  return (
    <div  className="d-flex justify-content-center flex-column">
        <Container>
            <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                    <div className="users h-100">
                        <Userlist users={response?.lastVisitors || null} currentUserId={userId} page={0}/>
                    </div>
                </Grid>
                <Grid item xs={12} md={8}>
                    <div className="chat">
                        <TopHeaderView/>
                        <NameView />
                        <MessageView stomp={stompClient} currentUserId={userId}/>
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
