import React from 'react';
import { Button } from 'react-bootstrap';
//import { Test } from './SelectSexForm.styles';

/**
 * 
 * @param {*} props 
 * @returns 
 */
function SelectSexForm(props) {
  return(
    <div className="container p-3 d-flex justify-content-center">
    <div className="d-flex flex-column primary-form">
      <h4>Укажите ваш пол</h4>
      <Button className='m-3 p-2'>Мужчина</Button>
      <Button className='m-3 p-2'>Женчина</Button>          
    </div>
  </div> 
  );
}

export default SelectSexForm;
