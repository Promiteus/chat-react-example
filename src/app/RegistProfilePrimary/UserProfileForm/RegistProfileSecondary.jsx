import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import "./index.css"
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {regUserAsync, selectUser} from "../../Stores/slices/UserSlice";
import {AlertToast} from "../../Componetns/Modals/Toasts/AlertToast";
import {
    CAPTION_CONFIRM_YOUR_PASSWORD,
    CAPTION_REGISTRATION,
    CAPTION_SIGN, CAPTION_SIGN_IN,
    CAPTION_YOUR_LOGIN, CAPTION_YOUR_PASSWORD,
    MEET_PREFERENCES_DATA,
    SOMETHING_WENT_WRONG,
    SUBTITLE_MEETING_FOR,
    SUBTITLE_YOUR_BIRTHDAY,
    SUBTITLE_YOUR_LOGIN,
    SUBTITLE_YOUR_NAME,
    SUBTITLE_YOUR_PASSWORD,
    SUCH_USER_EXISTS
} from "../../Constants/TextMessagesRu";

import Loader from "../../Componetns/Loader/Loader";
import {USER_ID_KEY} from "../../Stores/api/Common/ApiCommon";
import {ROUTE_SIGNUP} from "../../Constants/Routes";
import RoundSubstrate from "../../Svg/Sunstrate/RoundSubstrate";
import {Assignment, AssignmentInd, Lock} from "@mui/icons-material";

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
/**
 *
 * @param {string} sex
 * @returns {JSX.Element}
 * @constructor
 */
export default function RegistProfileSecondary({sex}) {
    const [credentials] = useState({username: '', password: '', confirmPassword: ''});
    const [userProfile] = useState({ firstName: '', birthDate: '', meetPreferences: 'ALL', sex: sex});
    const dispatch = useDispatch();
    const {response, status, loading} = useSelector(selectUser);
    const navigate = useNavigate();

    const openAlert = () => (((+status !== 202) && (+status !== 0) && (credentials.username)) || (status === null));

    useEffect(() => {
        if ((+status === 202) && (response?.id?.toString().length > 0)) {
            localStorage.setItem(USER_ID_KEY, response?.id);
            navigate(`/?userId=${response?.id}`, response);
        }
    });

    if (loading) return <Loader/>;

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
            <div className="d-flex flex-column reg-primary-form">

                <div className="d-flex flex-row align-items-center justify-content-center">
                    <RoundSubstrate color="orange" children={<AssignmentInd/>} />
                    <h4 className="mt-2 mx-1">{"Почти готово"}</h4>
                </div>

                <label className="input-label mt-1">{SUBTITLE_YOUR_NAME}</label>
                <input className="input_field"
                       placeholder={SUBTITLE_YOUR_NAME}
                       type="text" required
                       onChange={(e) => {
                           userProfile.firstName = e.target.value;
                       }}
                />

                <label className="input-label mt-1">{SUBTITLE_YOUR_BIRTHDAY}</label>
                <input className="input_field"
                       placeholder={SUBTITLE_YOUR_BIRTHDAY}
                       defaultValue="1987-05-22"
                       type="date"
                       required
                       onChange={(e) => {
                           userProfile.birthDate = (e.target.value)
                       }}
                />

                <label className="input-label mt-1">{SUBTITLE_MEETING_FOR}</label>
                <select
                    className="input_field"
                    onChange={(e) => {
                        console.log(e.target.value);
                        userProfile.meetPreferences = e.target.value;
                    }}
                >
                    {MEET_PREFERENCES_DATA.map(item => (
                        <option value={item?.tag}>{item?.value}</option>
                    ))}
                </select>

                <label className="input-label mt-1">{SUBTITLE_YOUR_LOGIN}</label>
                <input
                    className="input_field"
                    placeholder={CAPTION_YOUR_LOGIN}
                    type="email"
                    required
                    onChange={(e) => {credentials.username = e.target.value}}/>

                <label className="input-label mt-1">{SUBTITLE_YOUR_PASSWORD}</label>
                <input
                    className="input_field"
                    placeholder={CAPTION_YOUR_PASSWORD}
                    type="password"
                    required
                    onChange={(e) => {
                        credentials.password = e.target.value
                    }}
                />

                <label className="input-label mt-1">{CAPTION_CONFIRM_YOUR_PASSWORD}</label>
                <input
                    className="input_field"
                    placeholder={CAPTION_CONFIRM_YOUR_PASSWORD}
                    type="password"
                    required
                    onChange={(e) => {
                        credentials.confirmPassword = e.target.value
                    }}
                />


                <Button onClick={onRegisterUser} className="mt-3" variant={'contained'}>{CAPTION_REGISTRATION}</Button>

                <div className="d-flex justify-content-center align-items-center mt-2">
                    <Link to={ROUTE_SIGNUP}>
                        <span className="d-inline-block mt-1 link">
                            {CAPTION_SIGN.toUpperCase()}
                        </span>
                    </Link>
                </div>
            </div>
            <AlertToast
                text={(+status === 409) ? SUCH_USER_EXISTS : SOMETHING_WENT_WRONG}
                open={openAlert}
                success={false}/>
        </div>

    );
}