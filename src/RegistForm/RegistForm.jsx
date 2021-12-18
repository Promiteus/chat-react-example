import React from 'react';
import { Button, Container } from 'react-bootstrap';
import BackArrowButton from '../Componetns/IconButtons/BackArrowButton/BackArrowButton';
import KeySvg from '../Svg/KeySvg';
import PersonSvg from '../Svg/PersonSvg';
import './RegistForm.css';


function RegistForm(props) {
  let inputPassword = {};
  let inputLogin = {}

  function loginOnChange(e) {
    console.log(`inputLogin: ${e.target.value}`);
  }

  function passwordOnChange(e) {
    console.log(`inputPassword: ${e.target.value}`);
  }

  return (
    <div className="container p-2 d-flex justify-content-center">
    <div id="regist-form" className="d-flex flex-column">
       <BackArrowButton text={"Вход"}/>
       <div className='d-flex justify-content-center align-content-center'><h4>Регистрация</h4></div>

       <Container>
            <div className="d-flex justify-content-center align-content-center mt-2">
               <div className="mx-2"><PersonSvg/></div>
               <div>
                 <input 
                   ref={el => (inputLogin = el)} 
                   onChange={loginOnChange} 
                   type="email"
                   placeholder='Введите логин'/>
               </div> 
            </div>  
            <div className="d-flex justify-content-center align-content-center mt-4">
               <div className="mx-2"><KeySvg/></div>
               <div>
                 <input 
                   ref={el => (inputPassword = el)} 
                   onChange={passwordOnChange} 
                   type="password" 
                   placeholder='Введите пароль'/>
               </div>
            </div>
            <div className="d-flex justify-content-center align-content-center mt-4">
               <div className="mx-2"><KeySvg/></div>
               <div >
                 <input 
                   ref={el => (inputPassword = el)} 
                   onChange={passwordOnChange} 
                   type="password" placeholder='Подтвердить пароль' />
              </div>
            </div>
         <div className='d-flex justify-content-end'><Button className='mt-4'>Принять</Button></div> 
       </Container>       
    </div>
  </div>
  );
}


export default RegistForm;
