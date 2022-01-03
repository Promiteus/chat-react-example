import React from 'react';
import MessageItemElement from '../MessageItemElement/MessageItemElement';
import './MessageItem.css';

function MessageItem({data, currentUserId}) {

    function chatBudge(data, curUserId) {
        if (data?.userId === curUserId) {
            return (
              <div className="MessageItem p-1 mt-2 d-flex">
                  <MessageItemElement>{data?.message}</MessageItemElement>
              </div>);
        } else {
            return (
              <div className="MessageItem p-1 mt-2 d-flex flex-row-reverse">
                 <MessageItemElement>{data?.message}</MessageItemElement>
              </div>
            );
        }
    }

    return (chatBudge(data, currentUserId));
}


export default MessageItem;
