import React, { useState } from 'react';
import './MessageSendView.css';
import SendMsgButton from '../Controls/SVG/SendMsgButton/SendMsgButton';

function MessageSendView ({stomp}) {
  const [content, setContent] = useState('');
  const TOPIC = '/roman';

  function updateInputValue(e) {
    setContent(e.target.value);
  }

  function onSend() {
     stomp.sendMessage('chat', 'Roman Matveev', TOPIC, content);
  }

  function onKey(e) {
    if (e.keyCode === 13) { //Enter key
      stomp.sendMessage('chat', 'Roman Matveev', TOPIC, content);
    }
  }

  return (
    <div className="chat-msg-sender p-2 d-flex flex-row">
      <input type="text" className="chat-msg-input text-dark form-control" onKeyDown={onKey} onChange={updateInputValue} placeholder="Message here" />
      <SendMsgButton onClick={onSend}/>
    </div>
  )
};


export default MessageSendView;
