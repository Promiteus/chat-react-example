import React, {useEffect, useState} from 'react';
import Userprofile from "./UserProfile/UserProfile";
import {FormControl, IconButton, Input, InputBase, InputLabel, Paper, Typography} from "@mui/material";
import {SearchSvg} from "../../../Svg";
import PersonSvg from "../../../Svg/PersonSvg";

/**
 *
 * @param users
 * @returns {JSX.Element}
 * @constructor
 */
export default function Userlist({users}) {
    const [selectedUser, setSelectedUser] = useState(0);

    function clickItem({user}) {
        console.log('clickItem: '+user.id);
        setSelectedUser(user.id);
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

          {(users) ? users.map((user) => {
            return <div key={user.id} className="mt-1">
                      <Userprofile onClick={clickItem} selected={(selectedUser === user.id)} user={user}/>
                   </div>
          }) :
          <div><Typography variant={"h6"} className="text-center">Гостей нет</Typography></div>}
      </div>
    );
}
