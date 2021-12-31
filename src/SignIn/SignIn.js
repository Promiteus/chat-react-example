import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import KeySvg from "../Svg/KeySvg";
import "./SignIn.css"
import {Button, FormControl, Input, InputLabel} from "@mui/material";
import PersonSvg from "../Svg/PersonSvg";
import {useDispatch, useSelector} from "react-redux";
import {authUserAsync, selectUser} from "../Stores/slices/UserSlice";
import {AlertToast} from "../Componetns/Modals/Toasts/AlertToast";
import {getNotificationMsg} from "../Constants/TextMessagesRu";
import Loader from "../Componetns/Loader/Loader";
import {TOKEN_KEY, USER_ID_KEY} from "../Stores/api/Common/ApiCommon";


export default function SignIn()  {
    const [credential] = useState({login: '', password: ''});
    const dispatch = useDispatch();
    const {response, status, loading } = useSelector(selectUser);
    const navigator = useNavigate();

    const openAlert = () => (((+status !== 0) && (+status !== 200) && (credential.login)) || (status === null));

    useEffect(() => {
        //Обновить токен авторизации
        if (response?.token) {
            localStorage.setItem(TOKEN_KEY, response?.token);
        }

        if ((+status === 200) && (response?.token) && (credential.login)) {
            localStorage.setItem(USER_ID_KEY, response?.userId);
            //Перейти на главную страницу
            navigator(`/?userId=${response?.userId}`);
        } else if ((+status === 404) && (credential.login)) {
            //Перейти на страницу регистрации
            navigator('/registration');
        }
    }, [status]);

    function SignInClick() {
       //Попытка войти в приложение
       dispatch(authUserAsync({
           username: credential.login,
           password: credential.password
       }));
    }

    if (loading) return <Loader/>;

    return (
        <div className="container p-2 d-flex justify-content-center">            
             <div className="d-flex flex-column primary-form">
               
                 <div className="d-flex justify-content-center align-items-center">
                     <h3 className="text-center">Вход</h3>
                 </div>

                 <FormControl variant="standard">
                     <InputLabel htmlFor="input-with-icon-adornment">
                         Укажите ваш логин
                     </InputLabel>
                     <Input
                         onChange={(e) => credential.login = e.target.value}
                         id="input-with-icon-adornment"
                         type="text"
                         required
                         startAdornment={
                             <div className="mx-1">
                                 <PersonSvg/>
                             </div>
                         }

                     />
                 </FormControl>
                 <FormControl variant="standard">
                     <InputLabel htmlFor="input-with-icon-adornment">
                         Укажите ваш пароль
                     </InputLabel>
                     <Input
                         onChange={(e) => credential.password = e.target.value}
                         id="input-with-icon-adornment"
                         type="password"
                         required
                         startAdornment={
                             <div className="mx-1">
                                 <KeySvg/>
                             </div>
                         }
                     />
                 </FormControl>

                 <div className="mt-3"><Link to="/#">Забыл пароль?</Link></div>

                 <div className="d-flex align-items-center justify-content-end">
                    <Button variant="outlined" className="mt-3" onClick={SignInClick}>Войти</Button>
                 </div>
                    
             </div>
            <AlertToast text={getNotificationMsg(status)} open={openAlert} success={false}/>
        </div>
    );
}