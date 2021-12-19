import React, {useState} from "react";
import { TextField} from "@mui/material";
import { DatePicker} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';

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

                <div className="d-flex justify-content-center align-content-center mt-2">
                   <TextField
                       onChange={(e) => {subProfile.firstName = e.target.value}}
                       required
                       id="standard-required"
                       label="Как вас зовут?"
                       variant="standard"
                   />
                </div>
                <div className="d-flex justify-content-center align-content-center mt-2">
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                        <DatePicker
                            mask={'__.__.____'}
                            date={new Date()}
                            onChange={(e) => {setBirthDate(e)}}
                            value={birthDate}
                            openPicker={() => {console.log("open picker")}}
                            rawValue={new Date()}
                            renderInput={(params) => <TextField
                                required
                                id="standard-required"
                                variant="standard"
                                label="Когда родились?"
                                {...params} />}/>
                    </LocalizationProvider>
                </div>
            </div>
        </div>
    );
}