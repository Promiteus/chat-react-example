import React, { useEffect,  useState } from 'react';
import MessageItem from './MessageItem/MessageItem';
import './MessageView.css'
import {useSelector} from "react-redux";
import {selectChat} from "../../Stores/slices/ChatSlice";

function MessageView({stomp}) {
  const [messageList, setMessageList] = useState([]);
  const {status, response, loading} = useSelector(selectChat);


  useEffect(() => {
    if (stomp) {
      stomp.onMessageReceived = (data) => {
        let body = JSON.parse(data.body);

        if ((body) && (body.content)) {
          setMessageList(prev => [...prev, body.content]);
        }
      };
    }
  });

  //Реагировать на смену статуса при запросе последних сообщений из чата
  useEffect(() => {
     console.log("MessageView status: "+status);
     if (+status === 200) {
         console.log("MessageView response: "+JSON.stringify(response?.data));
         
     }

  }, [status])
  
  return (
    <div className="chatView d-flex flex-column" >
      {messageList.map((data, index) => (<MessageItem key={index} msg={data}/>))}    
    </div>
  );
};


export default MessageView;
