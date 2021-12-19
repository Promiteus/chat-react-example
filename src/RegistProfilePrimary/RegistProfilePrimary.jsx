import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import SelectSexForm from './SelectSexForm/SelectSexForm';
import BaseUserProfileForm from "./UserProfileForm/BaseUserProfileForm";


function RegistProfilePrimary() {
    const [sex, setSex] = useState('');

    useEffect(() => {
       // console.log(sex);
    }, [])

    return (
     <div className="">
        <nav className=' d-flex flex-row-reverse m-3' >
          <Link to="/signin">Вход</Link>
        </nav>

         { (sex === '') ?
             <SelectSexForm
                 onClick={(data) => {setSex(data.target.value)}}/> :
             <BaseUserProfileForm/>
         }
     </div>

 
   );
}

export default RegistProfilePrimary;
