import React, {useEffect, useRef} from 'react';
import MessageSendView from '../MessageSendView/MessageSendView';
import MessageView from '../MessageView/MessageView';
import NameView from '../NameView/NameView';
import TopHeaderView from '../TopHeaderView/TopHeaderView';
import './ChatView.css'
import Userlist from "../Users/UserList/UserList";
import {Grid} from "@mui/material";

let chatClientHeight = 750;

function ChatView ({userId, stomp, response}) {
    const chatRef = useRef();

    useEffect(() => {
        chatClientHeight = chatRef.current.clientHeight;
    }, []);

    return (
      <div ref={chatRef} className="d-flex flex-row justify-content-center h-100">
              <Grid container spacing={1}>
                  <Grid item xs={12} md={4}>
                      <div className="users h-100">
                          <Userlist users={response?.lastChats || []} currentUserId={userId} page={0}/>
                      </div>
                  </Grid>
                  <Grid item xs={12} md={8}>
                      <div className="d-flex flex-column chat h-100">
                          <TopHeaderView/>
                          <NameView />
                          <MessageView stomp={stomp} currentUserId={userId} chatClientHeight={chatClientHeight}/>
                          <MessageSendView stomp={stomp} currentUserId={userId}/>
                      </div>
                  </Grid>
              </Grid>
      </div>
    );
}


export default ChatView;
