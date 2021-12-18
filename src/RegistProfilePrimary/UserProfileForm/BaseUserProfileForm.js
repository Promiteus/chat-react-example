import React, {useState} from "react";
import {Container, TextField} from "@mui/material";

export default function BaseUserProfileForm() {
    const [birthDate, setBirthDate] = useState(new Date());

    let subProfile = {
        firstName: '',
        lastName: '',
        birthDate: '',
    }

    return(
        <div className="container p-3 d-flex justify-content-center">
            <div className="d-flex flex-column primary-form">
                <h4 className="text-center">Почти готово</h4>
                   <Container>
                       <div className="d-flex justify-content-center align-content-center mt-2">
                           <div>
                               <TextField
                                   onChange={(e) => {subProfile.firstName = e.target.value}}
                                   required
                                   id="standard-required"
                                   label="Как вам зовут"
                                   variant="standard"
                               />


                           </div>
                       </div>
                   </Container>
            </div>
        </div>
    );
}