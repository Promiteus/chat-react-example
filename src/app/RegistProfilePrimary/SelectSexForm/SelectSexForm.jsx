import React from 'react';
import {Button} from "@mui/material";
import {SEX_DATA, SUBTITLE_SELECT_SEX} from "../../Constants/TextMessagesRu";
import RoundSubstrate from "../../Svg/Sunstrate/RoundSubstrate";
import {Wc} from "@mui/icons-material";

/**
 * Форма выбора пола
 * @param {*} props 
 * @returns 
 */
function SelectSexForm({onClick}) {
  return(
    <div className="container p-3 d-flex justify-content-center">
    <div className="d-flex flex-column primary-form">
      <div className="d-flex flex-row justify-content-center align-items-center">
        <RoundSubstrate color="orange" children={<Wc/>} />
       <h4 className="mt-2 mx-1">{SUBTITLE_SELECT_SEX}</h4>
      </div>
      {SEX_DATA.map(item => (
          <Button variant={'contained'} value={item?.tag} onClick={onClick} className='mt-3'>{item?.value}</Button>
      ))}
    </div>
  </div> 
  );
}

export default SelectSexForm;
