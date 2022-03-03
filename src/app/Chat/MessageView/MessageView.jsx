import React, {useEffect, useRef, useState} from 'react';
import MessageItem from './MessageItem/MessageItem';
import './MessageView.css'
import {useDispatch, useSelector} from "react-redux";
import {chatUserAsync, selectChat} from "../../Stores/slices/ChatSlice";
import {LinearProgress, Stack} from "@mui/material";
import {selectUserChatCommon} from "../../Stores/slices/UserProfileChatCommonSlice";

let page_ = 0;
let selectedUser_ = {};
let isExecuted = false;
let chatViewHeight = 578;
const CHAT_VIEW_PERCENT_HEIGHT = 78;




function MessageView({stomp, currentUserId, chatClientHeight}) {
  const [messageList, setMessageList] = useState([]);
  const [beforeMessageList, setBeforeMessageList] = useState([]);
  const {status, response, loading} = useSelector(selectChat);
  const {profile} = useSelector(selectUserChatCommon);
  const scrollChat = useRef(null);
  const chatBottomScroller = useRef(null);
  const chatDispatch = useDispatch();

  useEffect(() => {
      setTimeout(() => {
          scrollToBottom();
      }, 500);
  }, [profile]);

  useEffect(() => {
      //Пересчитать фиксированнцю высоту chatView и присвоить div контейнеру.
      chatViewHeight = (chatClientHeight*CHAT_VIEW_PERCENT_HEIGHT)/100;
  }, [chatClientHeight]);

  function scrollLoad() {
      if (scrollChat.current.scrollTop === 0) {
          isExecuted = false;
          loadMore();
      }
  }

  useEffect(() => {
      //При достижении прокрутки чата до верхней границы контейнера
      //происходит дозагрузка прошлых сообщений
      scrollChat?.current.addEventListener("scroll", scrollLoad);

      if (stomp) {
           //Получить подтверждение, что сообщение отправлено
           stomp.onMessageReceived = (data) => {
               let body = JSON.parse(data?.body);

               if ((body) && (body?.content)) {
                 setMessageList(prev => [...prev, {
                    id: body?.content?.id,
                    userId: body?.content?.userId, //Кому сообщение
                    fromUserId: body?.content?.fromUserId, //От кого сообщение
                    message: body?.content?.message, //Текст сообщения
                    timestamp: body?.content?.timestamp, //Время создания сообщения
                    read: body?.content?.isRead,
                 }]);
               }
             scrollToBottom();
           };
      }

      return () => {
          scrollChat?.current?.removeEventListener("scroll", scrollLoad);
      }
 }, []);

 /*
   * Вызывает прокрутку чата вниз при появлении новых сообщений
   *  */
 const scrollToBottom = () => {
     chatBottomScroller?.current?.scrollIntoView({behavior: "smooth"});
 }

    /**
     * Запросить переписку постранично
     * @param {boolean} isMore
     */
 function loadMore() {
     let selectedUserId = selectedUser_?.id;
     if (!isExecuted) {
         page_++;
         chatDispatch(chatUserAsync({
             page: page_,
             size: 10,
             userId: selectedUserId,
             fromUserId: currentUserId
         }));
         isExecuted = true;
     }
 }

 /**Загружает сообщения, которые были написанны ранее при прокрутке чата вверх*/
 function beforeData() {
     if ((+status === 200) && (response?.page > 0)) {
         response?.data?.forEach(elem => {
             setBeforeMessageList(prevState => [...prevState, elem ]);
         });
     }
 }
/**
 * Получает первую страницу сообщений переписки
 * */
 function defaultData() {
     if ((+status === 200) && (response?.page === 0)) {
         //Предочистка сиска сообщений перед переключением между пользователями
         setMessageList([]);
         setBeforeMessageList([]);
         page_ = 0;
         //Обновить список сообщений для выбранного пользователя
         response?.data?.forEach(elem => {
             setMessageList(prevState => [...prevState, elem ]);
         });
     }
    /*.filter(elem => (elem?.message !== ''))*/
 }


  //Реагировать на смену статуса при запросе последних сообщений из чата
  useEffect(() => {
        selectedUser_ = profile;
        defaultData();
        beforeData();
  }, [status]);
  
  return (
    <div className="flex-grow-1 my-1 h-100">
        {loading ?
        <Stack sx={{ width: '100%', color: 'grey.500'}} spacing={2}>
            <LinearProgress color="success" />
        </Stack> : <div className="w-100" style={{height: 4}}></div>}

        <div ref={scrollChat} style={{height: chatViewHeight}} className="chatView d-flex flex-column" >
            {beforeMessageList.map((element) => (<MessageItem key={element?.id} data={element} currentUserId={currentUserId}/>))}
            {messageList.map((element) => (<MessageItem key={element?.id} data={element} currentUserId={currentUserId}/>))}
            <div ref={chatBottomScroller}/>
        </div>
    </div>

  );
};


export default MessageView;
