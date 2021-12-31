import axios from "axios";
import {BASE_DATA_URL, getHeaderBearerConfigs} from "../Common/ApiCommon";


/**
 * Сохранить/изменить профиль пользователя
 * @param profile
 * @param token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function saveUserProfile(profile, token) {
    return axios.post(`${BASE_DATA_URL}/api/user_profile`, profile, getHeaderBearerConfigs("application/json", token));
}

/**
 * Удалить профиль пользователя
 * @param userId
 * @param token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function removeUserProfile(userId, token) {
    return axios.delete(`${BASE_DATA_URL}/api/user_profile/${userId}`, getHeaderBearerConfigs("application/json", token))
}

/**
 * Получить профиль пользователя по userId
 * @param userId
 * @param token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getUserProfile(userId, token) {
    return axios.get(`${BASE_DATA_URL}/api/user_profile/${userId}`, getHeaderBearerConfigs("application/json", token));
}


