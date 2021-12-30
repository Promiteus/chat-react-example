import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import SelectSexForm from './SelectSexForm/SelectSexForm';
import {Button} from "@mui/material";
import BaseUserProfileForm from "./UserProfileForm/BaseUserProfileForm";



function RegistProfilePrimary() {
    const [sex, setSex] = useState('');

    return (
     <div className="">
        <nav className=' d-flex flex-row-reverse m-3' >
          <Link to="/signin"><Button variant="outlined">Вход</Button></Link>
        </nav>

         { (sex === '') ?
             <SelectSexForm
                 onClick={(data) => {
                     setSex(data.target.value);
                 }}/> :
             <BaseUserProfileForm sex={sex}/>
         }
     </div>
   );
}

export default RegistProfilePrimary;
