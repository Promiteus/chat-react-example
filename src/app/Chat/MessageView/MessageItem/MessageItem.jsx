import React from 'react';
import MessageItemElement from '../MessageItemElement/MessageItemElement';
import './MessageItem.css';
import {Typography} from "@mui/material";
import {MSG_YOU} from "../../../Constants/TextMessagesRu";

function MessageItem({data, currentUserId}) {
     console.log("MessageItem: ")

    function chatBudge(data, curUserId) {
        if (data?.userId === curUserId) {
            return (
              <div className="MessageItem p-1 mt-2 d-flex">
                  <MessageItemElement>
                      <div><Typography variant={"body2"} sx={{color: '#555588'}}>{`${data?.firstName}`}</Typography></div>
                      <div className="d-flex">{data?.message}</div>
                      <div className="date-message-badge d-flex flex-row-reverse text-danger">{data?.timestamp}</div>
                  </MessageItemElement>
              </div>);
        } else {
            return (
              <div className="MessageItem p-1 mt-2 d-flex flex-row-reverse">
                  <MessageItemElement color={"#C2F78E"}>
                      <div><Typography variant={"body2"} sx={{color: '#555588'}}>{MSG_YOU}</Typography></div>
                      <div className="d-flex">{data?.message}</div>
                      <div className="date-message-badge d-flex flex-row-reverse text-danger">{data?.timestamp}</div>
                  </MessageItemElement>
              </div>
            );
        }
    }

    return (chatBudge(data, currentUserId));
}


export default MessageItem;
