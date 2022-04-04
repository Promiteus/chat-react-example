import React from 'react';
import {Button} from "@mui/material";
import {SEX_DATA, SUBTITLE_SELECT_SEX} from "../../Constants/TextMessagesRu";

/**
 * Форма выбора пола
 * @param {*} props 
 * @returns 
 */
function SelectSexForm({onClick}) {
  return(
    <div className="container p-3 d-flex justify-content-center">
    <div className="d-flex flex-column primary-form">
      <h4 className="text-center">{SUBTITLE_SELECT_SEX}</h4>
      {SEX_DATA.map(item => (
          <Button variant={'contained'} value={item?.tag} onClick={onClick} className='mt-3'>{item?.value}</Button>
      ))}
    </div>
  </div> 
  );
}

export default SelectSexForm;
