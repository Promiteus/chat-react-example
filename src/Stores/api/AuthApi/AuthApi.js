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
