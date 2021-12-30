import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import SelectSexForm from './SelectSexForm/SelectSexForm';
import {Button} from "@mui/material";
import BaseUserProfileForm from "./UserProfileForm/BaseUserProfileForm";
import {useDispatch, useSelector} from "react-redux";
import {selectProfile} from "../Stores/slices/UserProfileSlices";
import Loader from "../Componetns/Loader/Loader";


function RegistProfilePrimary() {
    const [sex, setSex] = useState('');
    const userDispatch = useDispatch();
    const { status, loading } = useSelector(selectProfile);

    if (loading) return <Loader/>;

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
