import React from 'react';
import { Link } from 'react-router-dom';
import SelectSexForm from './SelectSexForm/SelectSexForm';


function RegistProfilePrimary() {
   return (
     <div>
        <nav className=' d-flex flex-row-reverse m-3' >
          <Link to="/signin">Вход</Link>
        </nav>

       <SelectSexForm />  
     </div>

 
   );
}

export default RegistProfilePrimary;
