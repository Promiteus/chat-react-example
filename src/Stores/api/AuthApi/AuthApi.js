import axios from "axios";

const baseUrl = 'http://localhost:8081';

/**
 * Получить JWT токен в обмен на логин и пароль
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function authenticateUset(data) {
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
