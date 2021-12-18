import React from "react";
import { Link } from "react-router-dom";
import KeySvg from "../Svg/KeySvg";
import PersonSvg from "../Svg/PersonSvg";
import "./SignIn.css"
import {Button, Container} from "@mui/material";


export default function SignIn() {
    let inputPassword = {};
    let inputLogin = {};

    function SignInClick(e) {
       console.log(`inputPassword: ${inputPassword.value} inputLogin: ${inputLogin.value}`);
    }

    function loginOnChange(e) {
        console.log(`inputLogin: ${e.target.value}`);
    }

    function passwordOnChange(e) {
        console.log(`inputPassword: ${e.target.value}`);
    }

    return (
        <div className="container p-2 d-flex justify-content-center">            
             <div id="sign-in-form" className="d-flex flex-column">
               
               <div className="d-flex justify-content-center align-items-center"><h3 className="text-center">Вход</h3></div>
               <Container>
                  <div className="d-flex justify-content-center align-content-center mt-2">
                     <div className="mx-2"><PersonSvg/></div>
                     <div><input ref={el => (inputLogin = el)} onChange={loginOnChange} type="email" /></div> 
                  </div>  
                  <div className="d-flex justify-content-center align-content-center mt-4">
                    <div className="mx-2"><KeySvg/></div>
                    <div ><input ref={el => (inputPassword = el)} onChange={passwordOnChange} type="password" /></div>
                  </div>
                  <div className="mt-3"><Link to="/#">Забыл пароль?</Link></div>

                  <div className="d-flex align-items-center justify-content-end">
                    <Button className="mt-3" onClick={SignInClick}>Войти</Button>
                  </div>
                  
               </Container>
                    
             </div>
        </div>
    );
}