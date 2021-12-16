import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
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
               <Container>
                  <Row className='mt-4'>
                    <Col className='mt-1'><span>Логин</span></Col>
                    <Col> <input ref={el => (inputLogin = el)} onChange={loginOnChange} type="email" /> </Col>
                  </Row>
                  <Row className='mt-4'>
                    <Col className='mt-1'><span>Пароль</span></Col>
                    <Col><input ref={el => (inputPassword = el)} onChange={passwordOnChange} type="password" /></Col>
                  </Row>

                  <div className="d-flex align-items-center justify-content-end">
                    <Button className="mt-3" onClick={SignInClick}>Войти</Button>
                  </div>
               </Container>              
             </div>
        </div>
    );
}