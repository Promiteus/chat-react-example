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

let stompClient = new StompClient();

function ChatView (props) {
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  let users = user_accounts;

  useEffect(() => {    
    stompClient.connect();

    stompClient.connectionError = (error) => {
       setErrMsg(error);
       setShowError(true);
       setInterval(() => {setShowError(false)}, 5000);
    }


    return () => {
      stompClient.disconnect();  
    }
  }, [])

  return (
    <div>
        <Container>
            <Grid container spacing={1}>
                <Grid item md={3}>
                    <div className="users h-100">
                        <Userlist users={users}/>
                    </div>
                </Grid>
                <Grid item md={9}>
                    <div className="chat p-2">
                        <TopHeaderView/>
                        <NameView />
                        <MessageView stomp={stompClient}/>
                        <MessageSendView stomp={stompClient} />
                    </div>
                </Grid>
            </Grid>
        </Container>
        {/*<ToastV1 msg={errMsg} isShow={showError}/>*/}
    </div>   
  );
}


export default ChatView;
