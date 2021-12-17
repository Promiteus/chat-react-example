import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import KeySvg from '../Svg/KeySvg';
import PersonSvg from '../Svg/PersonSvg';
import './RegistForm.css';


function RegistForm(props) {
  let inputPassword = {};
  let inputLogin = {};

  function loginOnChange(e) {
    console.log(`inputLogin: ${e.target.value}`);
  }

  function passwordOnChange(e) {
    console.log(`inputPassword: ${e.target.value}`);
  }

  return (
    <div className="container p-2 d-flex justify-content-center">
    <div id="regist-form" className="d-flex flex-column">
       <div className='d-flex justify-content-center align-content-center'><h3>Регистрация</h3></div>

       <Container>
            <div className="d-flex justify-content-center align-content-center mt-2">
               <div className="mx-2"><PersonSvg/></div>
               <div><input ref={el => (inputLogin = el)} onChange={loginOnChange} type="email" /></div> 
            </div>  
            <div className="d-flex justify-content-center align-content-center mt-4">
               <div className="mx-2"><KeySvg/></div>
               <div ><input ref={el => (inputPassword = el)} onChange={passwordOnChange} type="password" /></div>
            </div>
            <div className="d-flex justify-content-center align-content-center mt-4">
               <div className="mx-2"><KeySvg/></div>
               <div ><input ref={el => (inputPassword = el)} onChange={passwordOnChange} type="password" /></div>
            </div>
         <div className='d-flex justify-content-end'><Button className='mt-4'>Принять</Button></div> 
       </Container>       
    </div>
  </div>
  );
}


export default RegistForm;
