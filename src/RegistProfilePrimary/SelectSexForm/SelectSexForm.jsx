import React from 'react';
import {Button} from "@mui/material";

/**
 * 
 * @param {*} props 
 * @returns 
 */
function SelectSexForm({onClick}) {
  return(
    <div className="container p-3 d-flex justify-content-center">
    <div className="d-flex flex-column primary-form">
      <h4>Укажите ваш пол</h4>
      <Button value={"MAN"} onClick={onClick} className='m-3 p-2'>Мужчина</Button>
      <Button value={"WOMAN"} onClick={onClick} className='m-3 p-2'>Женчина</Button>
    </div>
  </div> 
  );
}

export default SelectSexForm;
