import React, {useEffect, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import "./BaseUserProfileForm.css"
import {Link, useNavigate} from "react-router-dom";
import ArrowLeftSvg from "../../Svg/ArrowLeftSvg";
import {useDispatch, useSelector} from "react-redux";
import {regUserAsync, selectUser} from "../../Stores/slices/UserSlice";
import {AlertToast} from "../../Componetns/Modals/Toasts/AlertToast";
import {SOMETHING_WENT_WRONG, StrFormatter, SUCH_USER_EXISTS} from "../../Constants/TextMessagesRu";

/**
 * status = 409 - такой пользователь уже есть !
 * status = 202 - success
 * response = {
 * "id":"ff8081817e006c52017e007000130000",
 * "firstName":"Roman",
 * "lastName":"",
 * "birthDate":null,
 * "height":176,
 * "weight":65,
 * "aboutMe":"Обо мне любая инфа",
 * "kids":0,
 * "familyStatus":"SINGLE",
 * "rank":1400,
 * "sexOrientation":"HETERO",
 * "meetPreferences":"ALL",
 * "sex":"MAN"}
 * */

export default function BaseUserProfileForm({sex}) {
    const [credentials] = useState({username: '', password: ''});
    const [userProfile] = useState({ firstName: '', birthDate: '', meetPreferences: 'ALL', sex: sex});
    const dispatch = useDispatch();
    const {response, status, error, loading} = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if ((+status === 202) && (response?.id?.toString().length > 0)) {
            navigate('/', response);
        }
    })

    const onRegisterUser = () => {
        //Попытка зарегистрировать пользователя
        dispatch(regUserAsync({
            username: credentials.username,
            password: credentials.password,
            firstName: userProfile.firstName,
            birthDate: userProfile.birthDate,
            meetPreferences: userProfile.meetPreferences,
            sex: userProfile.sex,
        }));
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
                       defaultValue="1987-05-22"
                       fullWidth={true}
                       variant="standard"
                       InputLabelProps={{
                           shrink: true,
                       }}
                   />
                </div>
                <div className="d-flex justify-content-center align-content-center">
                    <FormControl fullWidth={true} variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel id="sexual-preference">С кем знакомитесь?</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="sexual-preference-list"
                            fullWidth={true}
                            value={userProfile.meetPreferences}
                            //defaultValue={'WOMAN'}
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
            <AlertToast
                text={(+status === 409) ? SUCH_USER_EXISTS : SOMETHING_WENT_WRONG}
                open={(+status !== 202) && (+status !== 0)}
                success={false}/>
        </div>

    );
}