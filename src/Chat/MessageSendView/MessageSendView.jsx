import React from 'react';
import './MessageSendView.css';
import SendMsgButton from '../Controls/SVG/SendMsgButton/SendMsgButton';
import {useDispatch} from "react-redux";
import {increment} from "../../Stores/slices/CommonSlice";

function MessageSendView ({stomp}) {
  const dispatch = useDispatch();

  const TOPIC = '/roman';
  let content = '';
  let inputMessage = {};

  function updateInputValue(e) {
    content = e.target.value;
  }

  function onSend() {
    if (stomp) {
       stomp.sendMessage('chat', 'Roman Matveev', TOPIC, content);
       dispatch(increment());
    }
  }

  function onKey(e) {
    if (e.keyCode === 13) { //Enter key
      if (stomp) {
          stomp.sendMessage('chat', 'Roman Matveev', TOPIC, content);
          dispatch(increment());
      }
      inputMessage.value = '';
    }
  }

  return (
    <div className="chat-msg-sender p-2 d-flex flex-row">
      <input ref={el => inputMessage = el} type="text" className="chat-msg-input text-dark form-control" onKeyDown={onKey} onChange={updateInputValue} placeholder="Message here" />
      <SendMsgButton onClick={onSend}/>
    </div>
  )
};


export default MessageSendView;
