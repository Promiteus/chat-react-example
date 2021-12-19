import React, {useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import "./BaseUserProfileForm.css"
import {Link} from "react-router-dom";
import RightChevron from "../../Svg/RightChevron";
import ArrowLeftSvg from "../../Svg/ArrowLeftSvg";

export default function BaseUserProfileForm() {
    const [birthDate, setBirthDate] = useState('');

    let subProfile = {
        firstName: '',
        lastName: '',
        birthDate: '',
    }

    return(
        <div className="p-3 d-flex justify-content-center ">
            <div className="d-flex flex-column primary-form">
                <h4 className="text-center">Почти готово</h4>

                <Link to="/signin">
                    <div className="d-inline-block mx-1">
                        <ArrowLeftSvg/>
                    </div>
                    <div className="d-inline-block mt-1">
                        Вход
                    </div>
                </Link>


                <div className="d-flex justify-content-center align-content-center mt-2">
                   <TextField
                       onChange={(e) => {subProfile.firstName = e.target.value}}
                       required
                       fullWidth={true}
                       id="standard-required"
                       label="Как вас зовут?"
                       variant="standard"
                   />
                </div>
                <div className="d-flex justify-content-center align-content-center mt-2">
                   <TextField
                       id="date"
                       label="Ваш день рождения"
                       type="date"
                       onChange={(e) => {console.log(e.target.value)}}
                       defaultValue="2017-05-24"
                       fullWidth={true}
                       variant="standard"
                       InputLabelProps={{
                           shrink: true,
                       }}
                   />
                </div>
                <div className="d-flex justify-content-center align-content-center">
                    <FormControl fullWidth={true} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">С кем знакомитесь?</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            fullWidth={true}
                            defaultValue={'WOMAN'}
                            onChange={() => {}}
                            label="С кем знакомитесь?">
                              <MenuItem value={'MAN'}>Мужчины</MenuItem>
                              <MenuItem value={'WOMAN'}>Женчины</MenuItem>
                              <MenuItem value={'ALL'}>Все</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="d-flex justify-content-center align-content-center mt-2">
                    <TextField
                       // onChange={(e) => credential.login = e.target.value}
                        required
                        fullWidth={true}
                        id="standard-required"
                        label="Укажите ваш логин"
                        variant="standard"
                    />
                </div>
                <div className="d-flex justify-content-center align-content-center mt-2">
                    <TextField
                       // onChange={(e) => credential.password = e.target.value}
                        type="password"
                        required
                        fullWidth={true}
                        id="standard-required"
                        label="Укажите ваш пароль"
                        variant="standard"
                    />

                </div>
                <div className="d-flex justify-content-center align-content-center mt-2">
                    <TextField
                        // onChange={(e) => credential.password = e.target.value}
                        type="password"
                        required
                        fullWidth={true}
                        id="standard-required"
                        label="Подтвердите ваш пароль"
                        variant="standard"
                    />

                </div>
                <Button className="mt-3" variant="outlined">Регистрация</Button>
            </div>

        </div>
    );
}