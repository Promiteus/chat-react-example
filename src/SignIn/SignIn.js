import React, {useState} from "react";
import { Link } from "react-router-dom";
import KeySvg from "../Svg/KeySvg";
import "./SignIn.css"
import {Button, Container, TextField} from "@mui/material";
import PersonSvg from "../Svg/PersonSvg";


export default function SignIn()  {
    const [credential] = useState({login: '', password: ''});


    function SignInClick() {
       console.log(`inputPassword: ${credential.password} inputLogin: ${credential.login}`);
    }

    return (
        <div className="container p-2 d-flex justify-content-center">            
             <div className="d-flex flex-column primary-form">
               
               <div className="d-flex justify-content-center align-items-center"><h3 className="text-center">Вход</h3></div>

                  <div className="d-flex justify-content-center align-content-center mt-2">
                      <div className="mx-2 d-flex align-items-center"><PersonSvg/></div>
                      <TextField
                          onChange={(e) => credential.login = e.target.value}
                          required
                          fullWidth={true}
                          id="standard-required"
                          label="Укажите ваш логин"
                          variant="standard"
                      />
                  </div>  
                  <div className="d-flex justify-content-center align-content-center mt-2">
                    <div className="mx-2 d-flex align-items-center"><KeySvg/></div>
                        <TextField
                            onChange={(e) => credential.password = e.target.value}
                            type="password"
                            required
                            fullWidth={true}
                            id="standard-required"
                            label="Укажите ваш пароль"
                            variant="standard"
                        />

                  </div>
                  <div className="mt-3"><Link to="/#">Забыл пароль?</Link></div>

                  <div className="d-flex align-items-center justify-content-end">
                    <Button variant="outlined" className="mt-3" onClick={SignInClick}>Войти</Button>
                  </div>
                    
             </div>
        </div>
    );
}