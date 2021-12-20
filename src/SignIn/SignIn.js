import React, {useState} from "react";
import { Link } from "react-router-dom";
import KeySvg from "../Svg/KeySvg";
import "./SignIn.css"
import {Button, FormControl, Input, InputLabel} from "@mui/material";
import PersonSvg from "../Svg/PersonSvg";


export default function SignIn()  {
    const [credential] = useState({login: '', password: ''});

    const {login, password} = credential;

    function SignInClick() {
       console.log(`inputPassword: ${password} inputLogin: ${login}`);
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