import React, {useEffect, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import "./BaseUserProfileForm.css"
import {Link} from "react-router-dom";
import ArrowLeftSvg from "../../Svg/ArrowLeftSvg";
import {useDispatch, useSelector} from "react-redux";
import {regUserAsync, selectUser} from "../../Stores/slices/UserSlice";

export default function BaseUserProfileForm() {
    const [credentials] = useState({username: '', password: ''});
    const [userProfile] = useState({ firstName: '', birthDate: '', meetPreferences: ''});
    const dispatch = useDispatch();
    const {response, status, error, loading} = useSelector(selectUser);


    useEffect(() => {
        console.log("status: "+status);
        console.log("loading: "+loading);
        console.log("response: "+JSON.stringify(response));
        console.log("error: "+error);
    })

    const onRegisterUser = () => {
        console.log(`credentials: ${JSON.stringify(credentials)} userProfile: ${JSON.stringify(userProfile)} `);

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
                       onChange={(e) => {
                           userProfile.firstName = e.target.value;
                          // console.log(e.target.value);
                       }}
                       required
                       fullWidth={true}
                       id="first-name-field"
                       label="Как вас зовут?"
                       variant="standard"
                   />
                </div>
                <div className="d-flex justify-content-center align-content-center mt-2">
                   <TextField
                       id="date-field"
                       label="Ваш день рождения"
                       type="date"
                       onChange={(e) => {userProfile.birthDate = (e.target.value)}}
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
                        <InputLabel id="sexual-preference">С кем знакомитесь?</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="sexual-preference-list"
                            fullWidth={true}
                            defaultValue={'WOMAN'}
                            onChange={(e) => {console.log(e.target.value); userProfile.meetPreferences = e.target.value;}}
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
                        id="login-field"
                        label="Укажите ваш логин"
                        onChange={(e) => {credentials.username = e.target.value}}
                        variant="standard"
                    />
                </div>
                <div className="d-flex justify-content-center align-content-center mt-2">
                    <TextField
                       // onChange={(e) => credential.password = e.target.value}
                        type="password"
                        required
                        fullWidth={true}
                        onChange={(e) => {credentials.password = e.target.value}}
                        id="password-field"
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
                        id="password-confirm-field"
                        label="Подтвердите ваш пароль"
                        variant="standard"
                    />

                </div>
                <Button onClick={onRegisterUser} className="mt-3" variant="outlined">Регистрация</Button>
            </div>

        </div>
    );
}