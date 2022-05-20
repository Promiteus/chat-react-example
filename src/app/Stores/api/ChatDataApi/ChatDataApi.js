import axios from "axios";
import {getHeaderBearerConfigs, TOKEN_KEY} from "../Common/ApiCommon";
import {getEnvOfStorage} from "../../Env";


/**
 * Сохранить/изменить профиль пользователя
 * @param {Object} profile
 * @param {function(res: Object, err: any)} callback
 */
export function saveUserProfile(profile, callback) {
    let token = localStorage.getItem(TOKEN_KEY);
    let promise = axios.post(`${getEnvOfStorage()?.dataUrl}/api/user/profile`, profile, getHeaderBearerConfigs("application/json", token));
    promise.then((data) => callback(data, null)).catch(err => callback(null, err));
}



/**
 * Удалить профиль пользователя
 * @param {string} userId
 * @param {string} token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function removeUserProfile(userId, token) {
    return axios.delete(`${getEnvOfStorage()?.dataUrl}/api/user/profile/${userId}`, getHeaderBearerConfigs("application/json", token))
}

/**
 * Получить профиль пользователя по userId
 * @param {string} userId
 * @param {string} token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getUserProfile(userId, token) {
    return axios.get(`${getEnvOfStorage()?.dataUrl}/api/user/profile/${userId}`, getHeaderBearerConfigs("application/json", token));
}

/**
 * Получить профиль пользователя по userId
 * @param {string} userId
 * @returns {Promise<AxiosResponse<*>>}
 */
export async function userProfile(userId)  {
    let token = localStorage.getItem(TOKEN_KEY);
    return await getUserProfile(userId, token);
}

/**
 * Получить список профилей постранично и по параметрам searchBody
 * @param {string} userId
 * @param {number} page
 * @param {string} token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function searchUserProfilesPageable(userId, page, token, searchBody) {
    return axios.post(`${getEnvOfStorage()?.dataUrl}/api/user/profiles/${page}/${userId}`, searchBody, getHeaderBearerConfigs("application/json", token));
}


