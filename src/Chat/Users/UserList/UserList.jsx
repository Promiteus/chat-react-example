import React, {useEffect, useState} from 'react';
import Userprofile from "./UserProfile/UserProfile";
import {FormControl, Input, InputLabel, Paper, Typography} from "@mui/material";
import {SearchSvg} from "../../../Svg";
import {useDispatch} from "react-redux";
import {chatUserAsync} from "../../../Stores/slices/ChatSlice";
import {defineSelectedUser} from "../../../Stores/slices/CommonSlice";


/**
 *
 * @param users
 * @param currentUserId
 * @param page
 * @returns {JSX.Element}
 * @constructor
 */
export default function Userlist({users, currentUserId, page}) {
    const [selectedUser, setSelectedUser] = useState(0);
    const chatDispatch = useDispatch();
    const commonDispatch = useDispatch();

    function clickItem({user}) {
        //Идентификатор выбранного пользователя
        let selectedUserId = user?.id;
        setSelectedUser(selectedUserId);
        if (user?.id) {
            //Занести в хранилище выбранного объект выбранного пользователя
            commonDispatch(defineSelectedUser(user));
            //Запросить переписку двух пользователей постранично
            chatDispatch(chatUserAsync({
                page: page,
                size: 10,
                userId: selectedUserId,
                fromUserId: currentUserId
            }))
        }
    }

    useEffect(() => {
        setSelectedUser(0);
    }, [users]);

    return (
      <div className="UserList p-2">
          <div><Typography variant={"h5"}>Гости</Typography></div>

          <Paper elevation={2} className="px-1">
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
          </Paper>

          {(users) ? users.map((user) => (
                   <div key={user.id} className="mt-1">
                      <Userprofile onClick={clickItem} selected={(selectedUser === user.id)} user={user}/>
                   </div>
              )) :
          <div><Typography variant={"h6"} className="text-center">Гостей нет</Typography></div>}
      </div>
    );
}
