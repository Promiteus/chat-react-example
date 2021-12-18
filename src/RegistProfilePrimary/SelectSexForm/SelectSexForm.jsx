import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
//import { Test } from './SelectSexForm.styles';

/**
 * 
 * @param {*} props 
 * @returns 
 */
function SelectSexForm(props) {

  function click(eventKey, event) {
      console.log("click: "+eventKey)
  }

  return(
    <div className="container p-3 d-flex justify-content-center">
    <div className="d-flex flex-column primary-form">
      <h4>Укажите ваш пол</h4>
      <Button className='m-3 p-2'>Мужчина</Button>
      <Button className='m-3 p-2'>Женчина</Button>  
 

     <Dropdown onSelect={click}>
     <Dropdown.Toggle className="bg-light text-dark "></Dropdown.Toggle>
      <Dropdown.Menu>
          <Dropdown.Item eventKey="MAN" >Мужчина</Dropdown.Item>
          <Dropdown.Item eventKey="WOMAN">Женчина</Dropdown.Item>
      </Dropdown.Menu>
     </Dropdown> 

           
    </div>
  </div> 
  );
}

export default SelectSexForm;
