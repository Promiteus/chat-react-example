import React, {useEffect, useRef, useState} from 'react';
import MessageItem from './MessageItem/MessageItem';
import './MessageView.css'
import {useSelector} from "react-redux";
import {selectChat} from "../../Stores/slices/ChatSlice";


function MessageView({stomp, currentUserId}) {
  const [messageList, setMessageList] = useState([]);
  const {status, response, loading} = useSelector(selectChat);
  const srollChat = useRef(null);

  useEffect(() => {
    if (stomp) {
         stomp.onMessageReceived = (data) => {
               let body = JSON.parse(data.body);

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
  });

  /*
   * Так выгдядят сохраненные сообщения чата
   data:
   [{"id":"61a0343931b2e54902c1b0b4","userId":"200","fromUserId":"203","message":"Сообщение от Konstantin номер 8.","timestamp":"2021-11-26 01:11:21"},
    {"id":"61a0343931b2e54902c1b0b5","userId":"200","fromUserId":"203","message":"Сообщение от Konstantin номер 9.","timestamp":"2021-11-26 01:11:21"},]
  * */

  //Реагировать на смену статуса при запросе последних сообщений из чата
  useEffect(() => {
     console.log("MessageView status: "+status);
     if (+status === 200) {
         console.log("MessageView response: "+JSON.stringify(response?.data));
         //Предочистка сиска сообщений перед переключением между пользователями
         setMessageList([]);
         //Обновить список сообщений для выбранного пользователя
         response?.data?.forEach(elem => {
              setMessageList(prevState => [...prevState, elem ]);
         });
     }
  }, [status]);
  
  return (
    <div ref={srollChat} className="chatView d-flex flex-column" >
      {messageList.map((element) => (<MessageItem key={element?.id} data={element} currentUserId={currentUserId}/>))}
    </div>
  );
};


export default MessageView;
