import React from 'react';
import './MessageSendView.css';
import SendMsgButton from '../Controls/SVG/SendMsgButton/SendMsgButton';
import {useDispatch, useSelector} from "react-redux";
import {increment, selectCommon} from "../../Stores/slices/CommonSlice";

function MessageSendView ({stomp, currentUserId}) {
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(selectCommon);

  const TOPIC = `${selectedUser?.id}`;
  let content = {};
  let inputMessage = {};

  function updateInputValue(e) {
    content = {
        id: null,
        userId: selectedUser?.id,
        fromUserId: currentUserId,
        message: e.target.value,
    };
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
