import React, {useEffect, useRef, useState} from 'react';
import MessageSendView from '../MessageSendView/MessageSendView';
import MessageView from '../MessageView/MessageView';
import TopHeaderView from '../TopHeaderView/TopHeaderView';
import './ChatView.css'
import UserList from "../Users/UserList/UserList";
import {Grid} from "@mui/material";

const HIDE_BLOCK = { xs: 'none', sm: 'none', md: 'block' };
const HIDE_MD_BLOCK = { xs: 'block', sm: 'block', md: 'none' };
const SHOW_BLOCK = { xs: 'block', sm: 'block', md: 'block' };

let chatClientHeight = 750;
let initialDisplayState = {
    chats: {
        value: SHOW_BLOCK
    },
    chatView: {
        value: HIDE_BLOCK
    }
};

function ChatView ({userId, stomp}) {
    //Переключение между списком пользователей и чатом с ними
    const [display, setDisplay] = useState(initialDisplayState);


    //Показать чат, скрыть список профилей чатов (история чатов)
    const onSelectedUser = (userId) => {
        setDisplay(prevState => ({...prevState, chatView: {value: SHOW_BLOCK}, chats: {value: HIDE_BLOCK}}));
    }

    //Показать список профилей (исорию чатов), скрыть чат
    const onBackToChats = (e) => {
        setDisplay(prevState => ({...prevState, chatView: {value: HIDE_BLOCK}, chats: {value: SHOW_BLOCK}}));
    }

    return (
      <div className="d-flex flex-row justify-content-center h-100">
              <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={4} sx={{ display:  display.chats.value}} className="h-100">
                      <div className="users h-100">
                           <UserList  currentUserId={userId} onSelected={onSelectedUser}/>
                      </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8} sx={{ display:  display.chatView.value}} className="h-100">
                      <div className="d-flex flex-column chat h-100 ">
                          <TopHeaderView onBack={onBackToChats} navButtonSx={HIDE_MD_BLOCK}/>
                          <div className="d-flex flex-column chat-view-panel p-1 bg-info">
                              <MessageView stomp={stomp} currentUserId={userId} />
                          </div>
                          <MessageSendView stomp={stomp} currentUserId={userId}/>
                      </div>
                  </Grid>
              </Grid>
      </div>
    );
}

export default ChatView;
