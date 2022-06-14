import React, {useEffect, useRef, useState} from 'react';
import './MessageView.css'
import {useDispatch, useSelector} from "react-redux";
import {LinearProgress, Stack} from "@mui/material";
import {selectUserChatCommon} from "../../Stores/slices/UserProfileChatCommonSlice";
import {getChatMessages, getChatMessagesByIds} from "../../Stores/api/ChatApi/ChatApi";
import {selectUpdateChatMessageStatus, setChatMessageStatus} from "../../Stores/slices/UpdateChatMessageStatusSlice";
import MessageItem from "./MessageItem/MessageItem";
import EmptyMessageList from "./MessageItem/EmptyMessageList";


let page_ = 0;
let selectedUser_ = {};

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
    //console.log("fillUnreadMessages messageList : "+JSON.stringify(data));

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
  const [loading, setLoading] = useState(false);
  const {profile} = useSelector(selectUserChatCommon);
  const scrollChat = useRef(null);
  const chatBottomScroller = useRef(null);
  const chatDispatch = useDispatch();
  const updatedMsgChatStatus = useSelector(selectUpdateChatMessageStatus);


    useEffect(() => {
        selectedUser_ = profile;
        loadMore(true);
        setTimeout(() => {
            scrollToBottom();
        }, 1000);
    }, [profile]);


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
      //  console.log("((readArr?.length > 0) || (writeArr?.length > 0)): "+((readArr?.length > 0) || (writeArr?.length > 0)));
        if ((readArr?.length > 0) || (writeArr?.length > 0)) {
         //   console.log("read: "+JSON.stringify(readArr));
          //  console.log("write: "+JSON.stringify(writeArr));
            getChatMessagesByIds(readArr, writeArr).then((res) => {
                chatDispatch(setChatMessageStatus({readMsg: res?.data?.readMessages, writeMsg: res?.data?.writeMessages}))
            });
        }
    }


   function scrollUp() {
       if (scrollChat.current.scrollTop === 0) {
          // isExecuted = false;
           loadMore();
           //Проверить/изменить статус непрочитанных сообщений
           updateChatMessagesStatus(Array.from(unreadMessageListForCurrentUser), Array.from(unreadMessageListForAnotherUser));
       }
   }

   function scrollDown() {
       if ((scrollChat?.current?.scrollTop + scrollChat?.current?.clientHeight+1) >= scrollChat?.current?.scrollHeight) {
           //Проверить/изменить статус непрочитанных сообщений
           setTimeout(() => {
               console.log("scrollDown()");
               updateChatMessagesStatus(Array.from(unreadMessageListForCurrentUser), Array.from(unreadMessageListForAnotherUser));
           }, 1000);
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
               // updateChatMessagesStatus(Array.from(unreadMessageListForCurrentUser), Array.from(unreadMessageListForAnotherUser));
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
     * @param {boolean} isDropPage
     */
    function loadMore(isDropPage = false) {
            setLoading(true);
           //TODO page должен быть в центрально хранилище и обнуляться там
            page_ = !isDropPage ? page_++: 0;
            getChatMessages(page_, selectedUser_?.id, currentUserId, (res, err) => {
                if (!err) {
                    beforeData(res?.data);
                    defaultData(res?.data);
                } else {
                    console.error(err);
                }
                setLoading(false);
            });

       // }
    }

   /**Загружает сообщения, которые были написанны ранее при прокрутке чата вверх*/
   function beforeData(response) {
       if (response?.page > 0) {
           response?.data?.forEach(elem => {
               setBeforeMessageList(prevState => [...prevState, elem ]);
           });

           fillUnreadMessages(response?.data, currentUserId);
       }
   }
   /**
    * Получает первую страницу сообщений переписки
    * */
    function defaultData(response) {
        clearUnreadMessages();

        if (response?.page === 0) {
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


  return (
    <div ref={scrollChat} className="message-view-panel p-1">
        {loading ?
        <Stack sx={{ width: '100%', color: 'grey.500'}} spacing={2}>
            <LinearProgress color="success" />
        </Stack> : <div className="w-100" style={{height: 4}}></div>}

        <div className="chatView d-flex flex-column" >
            {beforeMessageList.map((element) => (<MessageItem key={element?.id} data={element} selectedUser={profile} currentUserId={currentUserId}/>))}

            {messageList?.length > 0 && messageList.map((element) => (<MessageItem key={element?.id} selectedUser={profile} data={element} currentUserId={currentUserId}/>))}

            {((messageList?.length === 0) || (!messageList)) && <EmptyMessageList/>}
            <div ref={chatBottomScroller}/>
        </div>
    </div>

  );
};


export default MessageView;
