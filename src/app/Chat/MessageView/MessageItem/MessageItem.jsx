import React from 'react';
import MessageItemElement from '../MessageItemElement/MessageItemElement';
import './MessageItem.css';
import {Typography} from "@mui/material";
import {MSG_YOU} from "../../../Constants/TextMessagesRu";
import {MessageStatus, MessageStatusRound} from "../../Common";

function MessageItem({data, currentUserId}) {
    function chatBudge(data, curUserId) {
        if (data?.userId === curUserId) {
            return (
              <div className="MessageItem p-1 mt-2 d-flex">
                  <MessageItemElement data={data}>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                          <Typography variant={"body2"} sx={{color: '#555588'}}>{`${data?.firstName}`}</Typography>
                          <div className="date-message-badge d-flex flex-row-reverse text-primary">{data?.timestamp}</div>
                      </div>
                      <div className="d-flex">{data?.message}</div>
                      <div className="date-message-badge d-flex flex-row justify-content-between align-items-center text-danger">
                          <MessageStatusRound isRead={data?.read}/>
                      </div>
                  </MessageItemElement>
              </div>);
        } else {
            return (
              <div className="MessageItem p-1 mt-2 d-flex flex-row-reverse">
                  <MessageItemElement color={"#C2F78E"} data={data}>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                          <Typography variant={"body2"} sx={{color: '#555588'}}>{MSG_YOU}</Typography>
                          <div className="date-message-badge d-flex flex-row-reverse text-primary">{data?.timestamp}</div>
                      </div>
                      <div className="d-flex">{data?.message}</div>
                      <MessageStatus isRead={data?.read}/>
                  </MessageItemElement>

              </div>
            );
        }
    }

    return (chatBudge(data, currentUserId));
}


export default MessageItem;
