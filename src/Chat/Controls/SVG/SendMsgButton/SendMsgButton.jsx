import React from 'react';
import './SendMsgButton.css';

const SendMsgButton = ({onClick, w, h, color}) => (
  <div className="send-msg-btn" onClick={onClick}>
    <svg width={w || 28} height={h || 28} fill={color || 'red'}  viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
    </svg>
  </div>
);


export default SendMsgButton;
