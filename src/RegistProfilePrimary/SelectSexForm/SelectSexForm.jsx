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
      <h4 className="text-center">Укажите ваш пол</h4>
      <Button variant="outlined" value={"MAN"} onClick={onClick} className='mt-2'>Мужчина</Button>
      <Button variant="outlined" value={"WOMAN"} onClick={onClick} className='mt-4'>Женчина</Button>
    </div>
  </div> 
  );
}

export default SelectSexForm;
