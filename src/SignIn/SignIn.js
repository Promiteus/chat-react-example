import React from "react";
import "./SignIn.css"


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
               <div className="d-flex justify-content-center align-items-center" >           
                 <span className="m-2">Логин</span>
                 <input ref={el => (inputLogin = el)} onChange={loginOnChange} className="m-2" type="email" />          
               </div>
               <div className="d-flex justify-content-center align-items-center" >           
                 <span className="m-1 ">Пароль</span>
                 <input ref={el => (inputPassword = el)} onChange={passwordOnChange} className="m-2" type="password" />          
               </div>
               <div className="d-flex align-items-center justify-content-center">
                 <button onClick={SignInClick}>Войти</button>
               </div>
             </div>
        </div>
    );
}