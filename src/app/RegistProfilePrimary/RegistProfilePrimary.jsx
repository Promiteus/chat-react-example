import React, {useState} from 'react';
import SelectSexForm from './SelectSexForm/SelectSexForm';
import RegistProfileSecondary from "./UserProfileForm/RegistProfileSecondary";

/**
 * Выбрать пол. 1-й этап регистрации
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function RegistProfilePrimary(props) {
    const [sex, setSex] = useState('');

    return (
     <div className="">
         { (sex === '') ?
             <SelectSexForm
                 onClick={(data) => {
                     setSex(data.target.value);
                 }}/> :
             <RegistProfileSecondary sex={sex}/>
         }
     </div>
   );
}

export default RegistProfilePrimary;
