import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import SelectSexForm from './SelectSexForm/SelectSexForm';
import {Button} from "@mui/material";
import BaseUserProfileForm from "./UserProfileForm/BaseUserProfileForm";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserAccountAsync} from "../Stores/slices/UserSlice";
import {USER_ID_KEY} from "../Stores/api/AuthApi/AuthApi";
import {selectProfile} from "../Stores/slices/UserProfileSlices";


function RegistProfilePrimary() {
    const [sex, setSex] = useState('');
    const userDispatch = useDispatch();
    const { status, loading } = useSelector(selectProfile);

    return (
     <div className="">
        <nav className=' d-flex flex-row-reverse m-3' >
          <Link to="/signin"><Button variant="outlined">Вход</Button></Link>
        </nav>

         { (sex === '') ?
             <SelectSexForm
                 onClick={(data) => {
                     setSex(data.target.value);
                     //Удалить аккаунт пользователя только из сервиса авторизации
                     if (+status === 404) {
                         userDispatch(deleteUserAccountAsync({
                             userId: localStorage.getItem(USER_ID_KEY),
                             isAccountOnly: true
                         }));
                     }

                 }}/> :
             <BaseUserProfileForm sex={sex}/>
         }
     </div>

 
   );
}

export default RegistProfilePrimary;
