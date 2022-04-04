import React from 'react';
import './MessageItemElement.css';


const MessageItemElement = (props) => (
   <div className="d-flex flex-column message-item">
     <div style={{backgroundColor: props.color || 'white'}} className="MessageItemElement" >
       {props.children}
     </div>
   </div>
);

export default MessageItemElement;
