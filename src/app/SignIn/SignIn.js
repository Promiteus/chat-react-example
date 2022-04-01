import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import KeySvg from "../Svg/KeySvg";
import "./SignIn.css"
import {Button, FormControl, Input, InputLabel} from "@mui/material";
import PersonSvg from "../Svg/PersonSvg";
import {useDispatch, useSelector} from "react-redux";
import {AlertToast} from "../Componetns/Modals/Toasts/AlertToast";
import {getNotificationMsg} from "../Constants/TextMessagesRu";
import Loader from "../Componetns/Loader/Loader";
import {networkErrStatus, TOKEN_KEY, USER_ID_KEY} from "../Stores/api/Common/ApiCommon";
import {ROUTE_REGISTRATION} from "../Constants/Routes";
import {authenticateUser} from "../Stores/api/AuthApi/AuthApi";


export default function SignIn()  {
    const [credential] = useState({login: '', password: ''});
    const dispatch = useDispatch();
    //const {response, status, loading } = useSelector(selectUser);
    const [auth, setAuth] = useState({
        response: null,
        status: 404,
        loading: false,
    })
    const navigator = useNavigate();

    const openAlert = () => (((+auth.status !== 0) && (+auth.status !== 200) && (credential.login)) || (auth.status === null));

    const handleAuth = (response) => {
        //Обновить токен авторизации
        if (response?.data?.token) {
            localStorage.setItem(TOKEN_KEY, response?.data?.token);
        }

        if ((+response?.status === 200) && (response?.data?.token) && (credential.login)) {
            localStorage.setItem(USER_ID_KEY, response?.data?.userId);
            //Перейти на главную страницу
            navigator(`/?userId=${response?.data?.userId}`);
        } else if ((+response.status === 404) && (credential.login)) {
            //Перейти на страницу регистрации
            navigator(ROUTE_REGISTRATION);
        }
    }

    function SignInClick() {
        //Попытка войти в приложение
        setAuth(prevState => ({...prevState, loading: true}));
        authenticateUser({
            username: credential.login,
            password: credential.password
        }).then((res) => {
            setAuth({
                response: res?.data,
                loading: false,
                status: res?.status
            });
            handleAuth(res);
        }).catch(err => {
            setAuth(prevState => ({...prevState, status: networkErrStatus(err)}));
            setAuth(prevState => ({...prevState, loading: false}));
        });
    }

    if (auth.loading)
        return (
        <div className="p-2 d-flex justify-content-center ">
            <div className="d-flex flex-column preloader-panel">
               <Loader/>
            </div>
        </div>
    );

    return (
        <div className="p-2 d-flex justify-content-center h-100">
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
            <AlertToast text={getNotificationMsg(auth.status)} open={openAlert} success={false}/>
        </div>
    );
}