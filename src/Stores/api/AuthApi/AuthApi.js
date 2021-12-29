import axios from "axios";
import {getHeaderBearerConfigs, saveUserProfile} from "../ChatDataApi/ChatDataApi";

const BASE_URL = 'http://localhost:8081';
export const TOKEN_KEY = 'token';
export const USER_ID_KEY = 'userId';

/**
 * Получить JWT токен в обмен на логин и пароль
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function authenticateUser(data) {
    return axios.post(`${BASE_URL}/login`, data, {headers: { contentType: "application/json" } });
}

/**
 * Зарегистрировать нового пользователя
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function registrateUser(data) {
    return axios.post(`${BASE_URL}/api/user`, data, {headers: { contentType: "application/json"}});
}

/**
 * Удалить аккаунт пользователя из сервиса авторизации и сам профиль пользователя, если он есть
 * @param userId
 * @param isAccountOnly
 * @returns {Promise<AxiosResponse<any>>}
 */
export function removeFullUserAccountData({userId, isAccountOnly}) {
    let token = localStorage.getItem(TOKEN_KEY);
    return axios.delete(`${BASE_URL}/api/user?user_id=${userId}&account_only=${isAccountOnly}`, getHeaderBearerConfigs("application/json", token))
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
export async function fullRegistration({username, password, firstName, birthDate, meetPreferences, sex}) {
    return await registrateUser({username, password})
        .then((res) => authenticateUser({username, password}))
        .then((res) => {
            localStorage.setItem(TOKEN_KEY, res.data.token);
            return saveUserProfile({
                id: res.data.userId,
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
                }, res.data.token);
        });
}



