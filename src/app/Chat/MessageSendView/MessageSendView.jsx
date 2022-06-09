import React from 'react';
import './MessageSendView.css';
import SendMsgButton from '../Controls/SVG/SendMsgButton/SendMsgButton';
import {useDispatch, useSelector} from "react-redux";
import {increment} from "../../Stores/slices/CommonSlice";
import {selectUserChatCommon} from "../../Stores/slices/UserProfileChatCommonSlice";

function MessageSendView ({stomp, currentUserId}) {
  const dispatch = useDispatch();
  const {profile} = useSelector(selectUserChatCommon);

  let content = {};
  let inputMessage = {};

  function updateInputValue(e) {
    content = {
        id: null,
        userId: profile?.id,
        fromUserId: currentUserId,
        message: e.target.value,
        group: 0,
        isEmailed: false,
        isRead: false,
    };
  }

  function onSend() {
    if (stomp) {
        stomp.sendMessage('chat', profile?.firstName, profile?.id, content);
        dispatch(increment());
    }
  }

  function onKey(e) {
    if (e.keyCode === 13) { //Enter key
      if (stomp) {
          onSend();
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
