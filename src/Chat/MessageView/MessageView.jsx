import React, {useEffect, useRef, useState} from 'react';
import MessageItem from './MessageItem/MessageItem';
import './MessageView.css'
import {useDispatch, useSelector} from "react-redux";
import {chatUserAsync, selectChat} from "../../Stores/slices/ChatSlice";
import {selectCommon} from "../../Stores/slices/CommonSlice";
import {SELECTED_USER_ID_KEY} from "../../Stores/api/Common/ApiCommon";


function MessageView({stomp, currentUserId}) {
  const [messageList, setMessageList] = useState([]);
  const [beforeMessageList, setBeforeMessageList] = useState([]);
  const {status, response, loading} = useSelector(selectChat);
  const {selectedUser} = useSelector(selectCommon);
  const scrollChat = useRef(null);
  const chatDispatch = useDispatch();
  let page = 0;

  useEffect(() => {

    scrollChat.current.addEventListener("scroll", () => {
          if (scrollChat.current.scrollTop === 0) {
              loadMore();
          }
    });

    if (stomp) {
         stomp.onMessageReceived = (data) => {
             let body = JSON.parse(data?.body);

             if ((body) && (body?.content)) {
               setMessageList(prev => [...prev, {
                  id: '',
                  userId: "201",
                  fromUserId: currentUserId,
                  message: body.content,
               }]);
             }
         };
    }
 }, []);

 function loadMore() {
     let selectedUserId = localStorage.getItem(SELECTED_USER_ID_KEY);
     page++;
     chatDispatch(chatUserAsync({
         page: page,
         size: 10,
         userId: selectedUserId,
         fromUserId: currentUserId
     }))
 }

 function beforeData() {
     if ((+status === 200) && (response?.page > 0)) {

         response?.data?.forEach(elem => {
             setBeforeMessageList(prevState => [...prevState, elem ]);
         });
     }
 }

 function defaultData() {
     if ((+status === 200) && (response?.page === 0)) {
         //Предочистка сиска сообщений перед переключением между пользователями
         setMessageList([]);
         setBeforeMessageList([]);
         page = 0;
         //Обновить список сообщений для выбранного пользователя
         response?.data?.forEach(elem => {
             setMessageList(prevState => [...prevState, elem ]);
         });
     }
 }

  /*
   * Так выгдядят сохраненные сообщения чата
   data:
   [{"id":"61a0343931b2e54902c1b0b4","userId":"200","fromUserId":"203","message":"Сообщение от Konstantin номер 8.","timestamp":"2021-11-26 01:11:21"},
    {"id":"61a0343931b2e54902c1b0b5","userId":"200","fromUserId":"203","message":"Сообщение от Konstantin номер 9.","timestamp":"2021-11-26 01:11:21"},]
  * */
  //Реагировать на смену статуса при запросе последних сообщений из чата
  useEffect(() => {
        localStorage.setItem(SELECTED_USER_ID_KEY, selectedUser?.id);
        defaultData();
        beforeData();
  }, [status]);
  
  return (
    <div ref={scrollChat} className="chatView d-flex flex-column" >
      {beforeMessageList.map((element) => (<MessageItem key={element?.id} data={element} currentUserId={currentUserId}/>))}
      {messageList.map((element) => (<MessageItem key={element?.id} data={element} currentUserId={currentUserId}/>))}
    </div>
  );
};


export default MessageView;
