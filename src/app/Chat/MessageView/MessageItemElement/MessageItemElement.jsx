import React from 'react';
import './MessageItemElement.css';


const MessageItemElement = (props) => (
  <div style={{backgroundColor: props.color || 'white'}} className="MessageItemElement" >
    {props.children}
  </div>
);

export default MessageItemElement;
