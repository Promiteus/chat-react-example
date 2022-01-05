import React from 'react';
import MessageSendView from '../MessageSendView/MessageSendView';
import MessageView from '../MessageView/MessageView';
import NameView from '../NameView/NameView';
import TopHeaderView from '../TopHeaderView/TopHeaderView';
import './ChatView.css'
import Userlist from "../Users/UserList/UserList";
import {Container, Grid} from "@mui/material";




function ChatView ({userId, stomp, response}) {

  return (
    <div  className="d-flex justify-content-center flex-column">
        <Container>
            <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                    <div className="users h-100">
                        <Userlist users={response?.lastVisitors || []} currentUserId={userId} page={0}/>
                    </div>
                </Grid>
                <Grid item xs={12} md={8}>
                    <div className="chat">
                        <TopHeaderView/>
                        <NameView />
                        <MessageView stomp={stomp} currentUserId={userId}/>
                        <MessageSendView stomp={stomp} currentUserId={userId}/>
                    </div>
                </Grid>
            </Grid>
        </Container>
    </div>   
  );
}


export default ChatView;
