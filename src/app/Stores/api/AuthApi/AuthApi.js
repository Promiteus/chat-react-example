import axios from "axios";
import {saveUserProfile} from "../ChatDataApi/ChatDataApi";
import {getHeaderBearerConfigs, TOKEN_KEY, USER_ID_KEY} from "../Common/ApiCommon";
import {dateDiffYears} from "../../../Components/DateHandlers";
import {getEnvOfStorage} from "../../Env";

/**
 * Получить JWT токен в обмен на логин и пароль
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function authenticateUser(data) {
    return axios.post(`${getEnvOfStorage()?.authUrl}/login`, data, {headers: { contentType: "application/json" } });
}

/**
 * Зарегистрировать нового пользователя
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function registrateUser(data) {
    return axios.post(`${getEnvOfStorage()?.authUrl}/api/user`, data, {headers: { contentType: "application/json"}});
}

/**
 * Удалить аккаунт пользователя из сервиса авторизации и сам профиль пользователя, если он есть
 * @param userId
 * @param isAccountOnly
 * @returns {Promise<AxiosResponse<any>>}
 */
export function removeFullUserAccountData({userId, isAccountOnly}) {
    let token = localStorage.getItem(TOKEN_KEY);
    return axios.delete(`${getEnvOfStorage()?.authUrl}/api/user?user_id=${userId}&account_only=${isAccountOnly}`, getHeaderBearerConfigs("application/json", token))
}

/**
 * Регистрация пользователя на сервере авторизации и создание профиля на сервисе данных пользователей
 * @param username
 * @param password
 * @param firstName
 * @param birthDate
 * @param meetPreferences
 * @param sex
 * @param {function(data: object, err: any)} callback
 * @returns {Promise<AxiosResponse<*>>}
 */
export function fullRegistration({username, password, firstName, birthDate, meetPreferences, sex}, callback) {
    registrateUser({username, password})
        .then((res) => authenticateUser({username, password}))
        .then((res) => {
            callback(res, null);
            //console.log("data after: "+JSON.stringify(res));
            localStorage.setItem(USER_ID_KEY, res?.data?.userId);
            localStorage.setItem(TOKEN_KEY, res?.data?.token);
            saveUserProfile({
                id: res.data.userId,
                firstName: firstName,
                lastName: "",
                age: dateDiffYears(birthDate, new Date().toDateString()) || 18,
                birthDate: birthDate,
                height: 176,
                weight: 65,
                hobby: "Мои увлечения",
                aboutMe: "Обо мне ...",
                kids: 0,
                familyStatus: "SINGLE",
                rank: 1400,
                meetPreferences: meetPreferences,
                sexOrientation: "HETERO",
                sex: sex,
                country: 'Россия',
                region: '',
                locality: '',
            }, (data, err) => {
                if (err) {
                    console.log(err);
                    callback(null, err);
                }
            });

        }).catch(err => callback(null, err));
}



