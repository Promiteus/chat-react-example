import axios from "axios";
import {saveUserProfile} from "../ChatDataApi/ChatDataApi";

const baseUrl = 'http://localhost:8081';

/**
 * Получить JWT токен в обмен на логин и пароль
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function authenticateUser(data) {
    return axios.post(baseUrl+'/login', data, {headers: { "Content-Type": "application/json" } });
}

/**
 * Зарегистрировать нового пользователя
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function registrateUser(data) {
    return axios.post(baseUrl+'/api/user', data, {headers: {"Content-Type:": "application/json"}});
}

/**
 *
 * @param username
 * @param password
 * @param firstName
 * @param birthDate
 * @param meetPreferences
 * @param sex
 * @returns {Promise<AxiosResponse<*>>}
 */
export function fullRegistration({username, password, firstName, birthDate, meetPreferences, sex}) {
   return registrateUser({username, password})
        .then((res) => authenticateUser({username, password}))
        .then((res) => (saveUserProfile({
            id: res.data.user_id,
            firstName: firstName,
            lastName: "",
            birthDate: birthDate,
            height: 176,
            weight: 65,
            aboutMe: "Обо мне любая инфа",
            kids: 0,
            familyStatus: "SINGLE",
            rank: 1400,
            meetPreferences: meetPreferences,
            sexOrientation: "HETERO",
            sex: sex
        })));
}


/**
 * Уведомление при не 200 статусе
 * @param stat Number
 * @returns {string}
 */
export function getNotificationMsg(stat) {
    if (+stat === 403) {
        return `Неверный логин или пароль. Код ${+stat}`;
    } else if (+stat !== 200) {
        return `Что-то пошло не так!`;
    }
}
