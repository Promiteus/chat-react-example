import React from 'react';
import MessageItemElement from '../MessageItemElement/MessageItemElement';
import './MessageItem.css';

const MessageItem = ({msg}) => (
  <div className="MessageItem p-1 mt-2 d-flex">
      <MessageItemElement>{msg}</MessageItemElement>
  </div>
);

export default MessageItem;
