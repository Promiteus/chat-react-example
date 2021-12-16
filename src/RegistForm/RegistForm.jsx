import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './RegistForm.css';


const RegistForm = (props) => (
  <div className="container p-2 d-flex justify-content-center">
    <div id="regist-form" className="d-flex flex-column">
       <div className='d-flex justify-content-center align-content-center'><h3>Регистрация</h3></div>

       <Container>
         <Row className='mt-4'>
           <Col className='mt-1'><span>Логин</span></Col>
           <Col><input type="text" placeholder='example@mbox.ru'/></Col>
         </Row>
          <Row className='mt-4'>
           <Col className='mt-1'><span>Пароль</span></Col>
           <Col><input type="password" placeholder='Придумайте пароль'/></Col>
         </Row>
         <Row className='mt-4'>
           <Col className='mt-1'><span>Повторить</span></Col>
           <Col><input type="password" placeholder='Подтвердите пароль'/></Col>
         </Row> 
         <div className='d-flex justify-content-end'><Button className='mt-4'>Принять</Button></div> 
       </Container>       
    </div>
  </div>
);


export default RegistForm;
