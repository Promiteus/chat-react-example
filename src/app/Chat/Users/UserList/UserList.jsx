import React, {useEffect, useRef, useState} from 'react';
import Userprofile from "./UserProfile/UserProfile";
import {Chip, Divider, FormControl, Input, InputLabel, Paper, Typography} from "@mui/material";
import {SearchSvg} from "../../../Svg";
import {useDispatch, useSelector} from "react-redux";
import {chatUserAsync} from "../../../Stores/slices/ChatSlice";
import {CAPTION_CHATS, CAPTION_EMPTY_CHAT, CAPTION_EMPTY_PROFILES} from "../../../Constants/TextMessagesRu";
import {defineUserProfileOfChat} from "../../../Stores/slices/UserProfileChatCommonSlice";
import LoaderV2 from "../../../Componetns/Loader/LoaderV2";
import {PROFILE_CHATS_PAGE_SIZE} from "../../../Stores/api/Common/ApiCommon";
import {selectCommon} from "../../../Stores/slices/CommonSlice";
import {selectUserChats, userProfileChatsAsync} from "../../../Stores/slices/UserProfileChatsSlice";

let _chatSelectedUser = null;
let chatPage = 0;

/**
 * Компонент историй переписки для данного пользователя
 * @param {string} currentUserId
 * @param onSelected
 * @returns {JSX.Element}
 * @constructor
 */
export default function UserList({currentUserId, onSelected}) {
    const [selectedUser, setSelectedUser] = useState('0');
    const [chatUsers, setChatUsers] = useState([]);
    const chatDispatch = useDispatch();
    const userChatDispatch = useDispatch();
    const {chatSelectedUser} = useSelector(selectCommon);
    const userChats = useSelector(selectUserChats);
    const chatScroll = useRef(null);

    useEffect(() => {
        loadChatsHistoryNextPage(0);
        console.log("loadChatsHistoryNextPage")
    }, []);

    /**
     * Выполняется для подрузки данных постранично при прокрутке вниз
     */
    function loadMore() {
        if (chatPage === 0) {
            chatPage++;
        }
        loadChatsHistoryNextPage(chatPage);
    }

    useEffect(() => {
        console.log("UserList status: "+userChats?.status)
        if (userChats?.status === 200)  {
            console.log("update chatUsers")
            if (chatUsers?.length === 0) {
                setChatUsers(userChats?.response);
            } else if (chatUsers?.length > 0) {
                console.log("userChat response: "+JSON.stringify(userChats?.response))
                setChatUsers(prevState => [...prevState, userChats?.response]);
            }
        }
    }, [userChats?.response]);

    /**
     * Запросить у api историю чатов для текущего пользователя постранично
     * @param {number} aPage
     */
    function loadChatsHistoryNextPage(aPage) {
        chatDispatch(userProfileChatsAsync({
            page: aPage,
            size: PROFILE_CHATS_PAGE_SIZE,
            userId: currentUserId}));
    }

    function scrollLoad() {
        if ((chatScroll?.current?.scrollTop + chatScroll?.current?.clientHeight) >= chatScroll?.current?.scrollHeight) {
            loadMore();
        }
    }

    /**
     * Установить механизм подгрузки истории чатов текущего пользователя при достиженн числа
     * историй чатов значения PROFILE_CHATS_PAGE_SIZE
     */
    useEffect(() => {
            if (chatUsers.length >= PROFILE_CHATS_PAGE_SIZE) {
                chatScroll?.current?.addEventListener("scroll", scrollLoad);
            } else {
                chatScroll?.current?.removeEventListener("scroll", scrollLoad);
            }

       return () => {
           chatScroll?.current?.removeEventListener("scroll", scrollLoad);
       }
    }, [chatUsers]);



    /**
     * Получение чата текущего и выбранного пользователя при изменении chatSelectedUser
     */
    useEffect(() => {
        if ((chatSelectedUser) && (_chatSelectedUser !== chatSelectedUser)) {
            getUserChat(chatSelectedUser);
            _chatSelectedUser = chatSelectedUser;
        }
    }, [chatSelectedUser]);


    /**
     * Запросить переписку для текущего и выбранного пользователей
     * @param user
     */
    function getUserChat(user) {
        //Идентификатор выбранного пользователя
        let selectedUserId = user?.id;
        setSelectedUser(selectedUserId);
        if (user?.id) {
            //Занести в хранилище выбранного объект выбранного пользователя
            userChatDispatch(defineUserProfileOfChat(user));
            //Запросить переписку двух пользователей постранично
            chatDispatch(chatUserAsync({
                page: 0,
                size: 10,
                userId: selectedUserId,
                fromUserId: currentUserId
            }));
            onSelected(user?.id);
        }
    }

    /**
     * Запросить переписку для текущего и выбранного пользователей при выборе чата из списка
     * @param user
     */
    function clickItem({user}) {
        getUserChat(user);
    }

    useEffect(() => {
        setSelectedUser(0);
    }, [chatUsers]);

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
              <div ref={chatScroll} className="last-chat">
                  {(chatUsers.length !== 0) ? chatUsers.map((user) => (
                      <div key={user.id} className="mt-1">
                          <Userprofile onClick={clickItem} selected={(selectedUser === user.id)} user={user}/>
                      </div>
                      )) :
                      <div className="d-flex justify-content-center flex-row mt-2">
                          <Chip label={CAPTION_EMPTY_CHAT.toUpperCase()} color={"error"} variant={"outlined"}/>
                      </div>}
                  {userChats?.loading && <LoaderV2 />}
              </div>
          </div>
      </div>
    );
}
