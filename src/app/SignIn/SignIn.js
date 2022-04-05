import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import KeySvg from "../Svg/KeySvg";
import "./SignIn.css"
import {Button, FormControl, Input, InputLabel, TextField} from "@mui/material";
import PersonSvg from "../Svg/PersonSvg";
import {useDispatch} from "react-redux";
import {AlertToast} from "../Componetns/Modals/Toasts/AlertToast";
import {
    CAPTION_FORGET_PASSWORD,
    CAPTION_REGISTRATION,
    CAPTION_SIGN_IN, CAPTION_YOUR_LOGIN, CAPTION_YOUR_PASSWORD,
    getNotificationMsg, SUBTITLE_YOUR_LOGIN, SUBTITLE_YOUR_PASSWORD
} from "../Constants/TextMessagesRu";
import Loader from "../Componetns/Loader/Loader";
import {networkErrStatus, TOKEN_KEY, USER_ID_KEY} from "../Stores/api/Common/ApiCommon";
import {ROUTE_REGISTRATION} from "../Constants/Routes";
import {authenticateUser} from "../Stores/api/AuthApi/AuthApi";
import {Lock} from "@mui/icons-material";
import RoundSubstrate from "../Svg/Sunstrate/RoundSubstrate";


export default function SignIn()  {
    const [credential] = useState({login: '', password: ''});
    const dispatch = useDispatch();
    const [auth, setAuth] = useState({
        response: null,
        status: 404,
        loading: false,
    })
    const navigator = useNavigate();

    const openAlert = () => (((+auth.status !== 0) && (+auth.status !== 200) && (credential.login)) || (auth.status === null));

    /**
     * Сохранение JWT токена, переход на домашнюю страницу при успехе
     * @param {json} response
     */
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
               
                 <div className="d-flex flex-row align-items-center justify-content-center">
                     <RoundSubstrate color="orange" children={<Lock/>} />
                     <h4 className="mt-2 mx-1">{CAPTION_SIGN_IN}</h4>
                 </div>

                 <label className="input-label">{SUBTITLE_YOUR_LOGIN}</label>
                 <input className="input_field" placeholder={CAPTION_YOUR_LOGIN} type="email" required onChange={(e) => credential.login = e.target.value}/>

                 <label className="input-label mt-1">{SUBTITLE_YOUR_PASSWORD}</label>
                 <input className="input_field" placeholder={CAPTION_YOUR_PASSWORD} type="password" required onChange={(e) => credential.password = e.target.value}/>

                 <Button variant={'contained'} className="mt-3" onClick={SignInClick}>Войти</Button>

                 <div className="mt-3 d-flex justify-content-center"><a className="link" href="/#">{CAPTION_FORGET_PASSWORD.toUpperCase()}</a></div>
                 <div className="mt-3 d-flex justify-content-center"><a className="link" href={ROUTE_REGISTRATION}>{CAPTION_REGISTRATION.toUpperCase()}</a></div>

             </div>
            <AlertToast text={getNotificationMsg(auth.status)} open={openAlert} success={false}/>
        </div>
    );
}