import React from 'react';
import './MessageItemElement.css';


const MessageItemElement = (props) => (
  <div className="MessageItemElement" >
    {props.children}
  </div>
);

export default MessageItemElement;
