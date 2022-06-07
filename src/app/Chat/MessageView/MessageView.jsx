import React, {useEffect, useRef, useState} from 'react';
import './MessageView.css'
import {useDispatch, useSelector} from "react-redux";
import {chatUserAsync, selectChat} from "../../Stores/slices/ChatSlice";
import {LinearProgress, Stack} from "@mui/material";
import {selectUserChatCommon} from "../../Stores/slices/UserProfileChatCommonSlice";
import {getChatMessagesByIds} from "../../Stores/api/ChatApi/ChatApi";
import {selectUpdateChatMessageStatus, setChatMessageStatus} from "../../Stores/slices/UpdateChatMessageStatusSlice";
import MessageItem from "./MessageItem/MessageItem";
import EmptyMessageList from "./MessageItem/EmptyMessageList";


let page_ = 0;
let selectedUser_ = {};
let isExecuted = false;
let chatViewHeight = 578;
const CHAT_VIEW_PERCENT_HEIGHT = 78;

/**
 * Список непрочитанных сообщений.
 * */
let unreadMessageListForCurrentUser = new Set();
let unreadMessageListForAnotherUser = new Set();


/**
 * Выдать массив из непрочитанных сообщений для выбранного пользователя
 * @param messageList
 * @param {string} userId
 * @param {boolean} isNotForUserId
 * @returns {{any[]}}
 */
function unreadMessages(messageList, userId, isNotForUserId) {
    if (isNotForUserId) {
         return messageList.filter(item => (item?.read === false)).filter(item => (item?.fromUserId !== userId));
    }
    return messageList.filter(item => (item?.read === false)).filter(item => (item?.fromUserId === userId));
}

function concatUnique(a1, a2) {
    let c = a1.concat(a2);
    return c.filter((item, pos) => c.indexOf(item) === pos);
}

/**
 *
 * @param {*} data
 * @param {string} userId
 */
function fillUnreadMessages(data, userId) {
    unreadMessages(data, userId, false)?.forEach(item => {
        unreadMessageListForCurrentUser.add(item?.id);
    });
    unreadMessages(data, userId, true)?.forEach(item => {
        unreadMessageListForAnotherUser.add(item?.id);
    });
}

/**
 *
 * @param {any} chatMessages
 */
function removeMsgElem(elem) {
       if (elem?.read) {
           console.log("delete: "+unreadMessageListForCurrentUser.delete(elem?.id));
       }
}

function clearUnreadMessages() {
    unreadMessageListForAnotherUser?.clear();
    unreadMessageListForCurrentUser?.clear();
}

/**
 * Найти позицию сообщения для обновления
 * @param {any[]} msgArr
 * @param {any[]} state
 * @return {any[]}
 */
function posForUpdateReadMessages(msgArr, state) {
    let arrPos = [];
    msgArr.forEach(item => {
        let pos = state?.findIndex((elem) => (elem?.id === item?.id));
        if (pos >= 0) {
            arrPos.push({index: pos, data: item})
        }
    })
    return arrPos;
}

/**
 *
 * @param stomp
 * @param {string} currentUserId
 * @param {number} chatClientHeight
 * @returns {JSX.Element}
 * @constructor
 */
function MessageView({stomp, currentUserId, chatClientHeight}) {
  const [messageList, setMessageList] = useState([]);
  const [beforeMessageList, setBeforeMessageList] = useState([]);
  const {status, response, loading} = useSelector(selectChat);
  const {profile} = useSelector(selectUserChatCommon);
  const scrollChat = useRef(null);
  const chatBottomScroller = useRef(null);
  const chatDispatch = useDispatch();
  const updatedMsgChatStatus = useSelector(selectUpdateChatMessageStatus);
 // const [profile, setProfile] = useState(null);

  useEffect(() => {
      setTimeout(() => {
          scrollToBottom();
      }, 500);
  }, [profile]);

  useEffect(() => {
      //Пересчитать фиксированнцю высоту chatView и присвоить div контейнеру.
      chatViewHeight = (chatClientHeight*CHAT_VIEW_PERCENT_HEIGHT)/100;
  }, [chatClientHeight]);

  //Получить/подтвердить статус о прочтении сообщений
  useEffect(() => {
      let readMsg = updatedMsgChatStatus?.data?.readMsg;
      let writeMsg = updatedMsgChatStatus?.data?.writeMsg;

      let res = posForUpdateReadMessages(concatUnique(readMsg, writeMsg), messageList);
      let arr = messageList;
      res?.forEach(elem => {
          arr[elem.index] = elem.data;
      });
      setMessageList(prevState => (prevState = arr));

      res = posForUpdateReadMessages(concatUnique(readMsg, writeMsg), beforeMessageList);
      res?.forEach(elem => {
          let arr = messageList;
          arr[elem.index] = elem.data;
          setBeforeMessageList(arr);
      });
  }, [updatedMsgChatStatus]);

    /**
     * Проверить/изменить статус непрочитанных сообщений
     * @param {string[]} readArr
     * @param {string[]} writeArr
     */
    function updateChatMessagesStatus(readArr, writeArr) {
        if ((readArr?.length > 0) || (writeArr?.length > 0)) {
            getChatMessagesByIds(readArr, writeArr).then((res) => {
                chatDispatch(setChatMessageStatus({readMsg: res?.data?.readMessages, writeMsg: res?.data?.writeMessages}))
            });
        }
    }


  function scrollUp() {
      if (scrollChat.current.scrollTop === 0) {
          isExecuted = false;
          loadMore();
          //Проверить/изменить статус непрочитанных сообщений
          updateChatMessagesStatus(Array.from(unreadMessageListForCurrentUser), Array.from(unreadMessageListForAnotherUser));
      }
  }

  function scrollDown() {
      if ((scrollChat?.current?.scrollTop + scrollChat?.current?.clientHeight) >= scrollChat?.current?.scrollHeight) {
          //Проверить/изменить статус непрочитанных сообщений
          updateChatMessagesStatus(Array.from(unreadMessageListForCurrentUser), Array.from(unreadMessageListForAnotherUser));
      }
  }

  useEffect(() => {
      //При достижении прокрутки чата до верхней границы контейнера
      //происходит дозагрузка прошлых сообщений
      scrollChat?.current.addEventListener("scroll", scrollUp);
      //Событие вызывается при прокрутки чата вниз до самого последнего сообщения
      scrollChat?.current.addEventListener("scroll", scrollDown);

      if (stomp) {
           //Получить подтверждение, что сообщение отправлено мной же или получено от другого пользователя
           stomp.onMessageReceived = (data) => {
               let body = JSON.parse(data?.body);

               if ((body) && (body?.content) && ((selectedUser_?.id === body?.content?.fromUserId) || (selectedUser_?.id === body?.content?.userId))) {
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

      clearUnreadMessages();

      return () => {
          scrollChat?.current?.removeEventListener("scroll", scrollUp);
          scrollChat?.current?.removeEventListener("scroll", scrollDown);
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

         fillUnreadMessages(response?.data, currentUserId);
     }
 }
/**
 * Получает первую страницу сообщений переписки
 * */
 function defaultData() {
     clearUnreadMessages();

     if ((+status === 200) && (response?.page === 0)) {
         //Предочистка сиска сообщений перед переключением между пользователями
         setMessageList([]);
         setBeforeMessageList([]);
         page_ = 0;
         //Обновить список сообщений для выбранного пользователя
         response?.data?.forEach(elem => {
             setMessageList(prevState => [...prevState, elem ]);
         });

         fillUnreadMessages(response?.data, currentUserId);
     }
 }


  //Реагировать на смену статуса при запросе последних сообщений из чата
  useEffect(() => {
        selectedUser_ = profile;
        defaultData();
        beforeData();
  }, [status]);
  
  return (
    <div ref={scrollChat} className="message-view-panel p-1">
        {loading ?
        <Stack sx={{ width: '100%', color: 'grey.500'}} spacing={2}>
            <LinearProgress color="success" />
        </Stack> : <div className="w-100" style={{height: 4}}></div>}

        <div /*style={{height: chatViewHeight}}*/ className="chatView d-flex flex-column" >
            {beforeMessageList.map((element) => (<MessageItem key={element?.id} data={element} selectedUser={profile} currentUserId={currentUserId}/>))}

            {messageList?.length > 0 && messageList.map((element) => (<MessageItem key={element?.id} selectedUser={profile} data={element} currentUserId={currentUserId}/>))}

            {((messageList?.length === 0) || (!messageList)) && <EmptyMessageList/>}
            <div ref={chatBottomScroller}/>
        </div>
    </div>

  );
};


export default MessageView;
