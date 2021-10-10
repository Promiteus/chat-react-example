import React, { useEffect,  useState } from 'react';
import MessageItem from './MessageItem/MessageItem';
import './MessageView.css'

function MessageView({stomp}) {
  const [messageList, setMessageList] = useState([]);


  useEffect(() => {
    //divRef.current.scrollIntoView({behavior: "smooth"});

    stomp.onMessageReceived = (data) => {
      let body = JSON.parse(data.body);
     
      if (body.content) {
        setMessageList(prev => [...prev, body.content]);
      }      
    };
  }); 

  
  return (
    <div className="chatView d-flex flex-column" >
      {messageList.map((data, index) => (<MessageItem key={index} msg={data}/>))}    
    </div>
  );
};


export default MessageView;
