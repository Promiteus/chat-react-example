import React from 'react';
import MessageItemElement from '../MessageItemElement/MessageItemElement';
import './MessageItem.css';

const MessageItem = ({data}) => (
  <div className="MessageItem p-1 mt-2 d-flex">
      <MessageItemElement>{data.message}</MessageItemElement>
  </div>
);

export default MessageItem;
