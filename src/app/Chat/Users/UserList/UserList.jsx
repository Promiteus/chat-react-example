import React, {useEffect, useState} from 'react';
import Userprofile from "./UserProfile/UserProfile";
import {Chip, Divider, FormControl, Input, InputLabel, Paper, Typography} from "@mui/material";
import {SearchSvg} from "../../../Svg";
import {useDispatch} from "react-redux";
import {chatUserAsync} from "../../../Stores/slices/ChatSlice";
import {CAPTION_CHATS, CAPTION_EMPTY_CHAT, CAPTION_EMPTY_PROFILES} from "../../../Constants/TextMessagesRu";
import {defineUserProfileOfChat} from "../../../Stores/slices/UserProfileChatCommonSlice";
import LoaderV2 from "../../../Componetns/Loader/LoaderV2";
import {PROFILE_CHATS_PAGE_SIZE} from "../../../Stores/api/Common/ApiCommon";


/**
 *
 * @param users
 * @param {string} currentUserId
 * @param {int} page
 * @param onSelected
 * @param {boolean} loading
 * @returns {JSX.Element}
 * @constructor
 */
export default function UserList({users, currentUserId, page, onSelected, loading}) {
    const [selectedUser, setSelectedUser] = useState(0);
    const [chatUsers, setChatUsers] = useState(users);
    const chatDispatch = useDispatch();
    const userChatDispatch = useDispatch();

    useEffect(() => {
        if (users?.length <= PROFILE_CHATS_PAGE_SIZE) {
            setChatUsers([]);
            setChatUsers(users);
        }
    }, [users]);

    function clickItem({user}) {
        //Идентификатор выбранного пользователя
        let selectedUserId = user?.id;
        setSelectedUser(selectedUserId);
        if (user?.id) {
            //Занести в хранилище выбранного объект выбранного пользователя
            userChatDispatch(defineUserProfileOfChat(user));
            //Запросить переписку двух пользователей постранично
            chatDispatch(chatUserAsync({
                page: page,
                size: 10,
                userId: selectedUserId,
                fromUserId: currentUserId
            }));
            onSelected(user?.id);
        }
    }

    useEffect(() => {
        setSelectedUser(0);
    }, [users]);

    return (
      <div className="UserList p-2 d-flex flex-column h-100">
          <div><Typography variant={"h5"}>{CAPTION_CHATS}</Typography></div>

          <div>
              <FormControl variant="standard" fullWidth={true}>
                  <InputLabel htmlFor="input-with-icon-adornment">
                      Поиск по имени
                  </InputLabel>
                      <Input
                          onChange={(e) => {}}
                          type="text"
                          required
                          fullWidth={true}
                          endAdornment={
                              <div className="mx-1">
                                  <SearchSvg h={16} w={16}/>
                              </div>
                          }
                       />
              </FormControl>
              <Divider/>
          </div>

          <div className="h-100 overflow-hidden">
              <div className="last-chat">
                  {(chatUsers.length !== 0) ? chatUsers.map((user) => (
                       <div key={user.id} className="mt-1">
                          <Userprofile onClick={clickItem} selected={(selectedUser === user.id)} user={user}/>
                       </div>
                      )) :
                      <div className="d-flex justify-content-center flex-row mt-2">
                          <Chip label={CAPTION_EMPTY_CHAT.toUpperCase()} color={"error"} variant={"outlined"}/>
                      </div>}
                  {loading && <LoaderV2 />}
              </div>
          </div>
      </div>
    );
}
