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
let chatMessages_ = [];



/**
 * Выдать массив из непрочитанных сообщений для выбранного пользователя
 * isUserMsg = true - сообщения текущего пользоватлея профиля
 * isUserMsg = false - сообщения собеседника
 * @param messageList
 * @param {string} userId
 * @param {boolean} isNotForUserId
 * @returns {string[]}
 */
function unreadMessages(messageList, userId, isMyMessages) {
    if (!isMyMessages) {
         return messageList.filter(item => (item?.read === false)).filter(item => (item?.fromUserId !== userId));
    }
    return messageList.filter(item => (item?.read === false)).filter(item => (item?.fromUserId === userId));
}

/**
 * Сложение двух массивов и получвения финального массива с неповторяющимися элементами
 * @param {any[]} a1
 * @param {any[]} a2
 * @returns {*}
 */
function concatUnique(a1, a2) {
    let c = a1.concat(a2);
    return c.filter((item, pos) => c.indexOf(item) === pos);
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
  const updatedMsgChatStatus = useSelector(selectUpdateChatMessageStatus);
  const chatDispatch = useDispatch();


    useEffect(() => {
        selectedUser_ = profile;
        page_=0;
        loadMore(true);
        setTimeout(() => {
            scrollToBottom();
        }, 1000);
    }, [profile]);




    useEffect(() => {
        chatMessages_ = messageList;
    }, [messageList]);


    useEffect(() => {
        chatMessages_ = concatUnique(chatMessages_, beforeMessageList);
    }, [beforeMessageList]);


  //Получить/подтвердить статус о прочтении сообщений
    useEffect(() => {
        let readMsg = updatedMsgChatStatus?.data.readMsg;
        let writeMsg = updatedMsgChatStatus?.data.writeMsg;

        let res = posForUpdateReadMessages(concatUnique(readMsg, writeMsg), messageList);
        let arr = messageList;
        res?.forEach(elem => {
            arr[elem.index] = elem.data;
        });
        setMessageList(arr);

        let res0 = posForUpdateReadMessages(concatUnique(readMsg, writeMsg), beforeMessageList);
        let arr0 = beforeMessageList;
        res0?.forEach(elem => {
            arr0[elem.index] = elem.data;
        });
        setBeforeMessageList(arr0);

    }, [updatedMsgChatStatus]);

    /**
     * Проверить/изменить статус непрочитанных сообщений
     * @param {string[]} myMessages
     * @param {string[]} notMyMessages
     */
    function updateChatMessagesStatus(myMessages, notMyMessages) {
        if ((myMessages?.length > 0) || (notMyMessages?.length > 0)) {
            getChatMessagesByIds(myMessages, notMyMessages).then((res) => {
                chatDispatch(setChatMessageStatus({readMsg: res?.data?.readMessages, writeMsg: res?.data?.writeMessages}));
            });
        } else {
            chatDispatch(setChatMessageStatus({readMsg: [], writeMsg: []}));
        }
    }


   function scrollUp() {
       if (scrollChat.current.scrollTop === 0) {
           page_++;
           loadMore();
           //Проверить/изменить статус непрочитанных сообщений
       }
   }



   function scrollDown() {
       if ((scrollChat?.current?.scrollTop + scrollChat?.current?.clientHeight+1) >= scrollChat?.current?.scrollHeight) {
           //Проверить/изменить статус непрочитанных сообщений
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
                   setMessageList(prev => [...prev, body?.content]);
               }
               scrollToBottom();
           };
       }

       let checkMsgs = setInterval(() => {
           updateChatMessagesStatus(
               unreadMessages(chatMessages_, currentUserId, true).map(item => item?.id),
               unreadMessages(chatMessages_, currentUserId, false).map(item => item?.id)
           );
       }, 8000);

       return () => {
           clearInterval(checkMsgs);
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
       }
   }
   /**
    * Получает первую страницу сообщений переписки
    * */
    function defaultData(response) {
        if (response?.page === 0) {
            //Предочистка сиска сообщений перед переключением между пользователями
            setMessageList([]);
            setBeforeMessageList([]);
            page_ = 0;
            //Обновить список сообщений для выбранного пользователя
            response?.data?.forEach(elem => {
                setMessageList(prevState => [...prevState, elem ]);
            });
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
