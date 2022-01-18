import React, {useState} from 'react';
import SelectSexForm from './SelectSexForm/SelectSexForm';
import BaseUserProfileForm from "./UserProfileForm/BaseUserProfileForm";



function RegistProfilePrimary() {
    const [sex, setSex] = useState('');

    return (
     <div className="">
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
