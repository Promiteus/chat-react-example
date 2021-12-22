import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import KeySvg from "../Svg/KeySvg";
import "./SignIn.css"
import {Button, FormControl, Input, InputLabel} from "@mui/material";
import PersonSvg from "../Svg/PersonSvg";
import {useDispatch, useSelector} from "react-redux";
import {authUserAsync, selectUser} from "../Stores/slices/UserSlice";


export default function SignIn()  {
    const [credential] = useState({login: '', password: ''});
    const dispatch = useDispatch();
    const {response, status} = useSelector(selectUser)
    const {login, password} = credential;

    useEffect(() => {
        console.log("status: "+status);
        console.log("response: "+JSON.stringify(response));
    });

    function SignInClick() {
       console.log(`inputPassword: ${password} inputLogin: ${login}`);
       dispatch(authUserAsync({
           username: "rom3889@yandex.ru",
           password: "03045995"
       }));
    }

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
        </div>
    );
}