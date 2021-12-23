import axios from "axios";

let userProfile = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    height: 0,
    weight: 0,
    aboutMe: '',
    kids: 0,
    familyStatus: 'SINGLE',
    rank: 0,
    sexOrientation: 'HETERO',
    meetPreferences: 'WOMAN',
    sex: 'MAN'
}

const baseUrl = 'http://localhost:8090';

function getHeaderConfigs(contentType, userId, token) {
    return { headers: { contentType: contentType,  authorization : `Bearer ${token}`}};
}

/**
 * Сохранить/изменить профиль пользователя
 * @param profile
 * @param token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function saveUserProfile(profile, token) {
    return axios.post(`${baseUrl}/api/user_profile`, profile, getHeaderConfigs("application/json", profile.id, token));
}

/**
 * Удалить профиль пользователя
 * @param userId
 * @param token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function removeUserProfile(userId, token) {
    return axios.delete(`${baseUrl}/api/user_profile/${userId}`,  getHeaderConfigs("application/json", userId, token))
}

/**
 * Получить профиль пользователя по userId
 * @param userId
 * @param token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getUserProfile(userId, token) {
    return axios.get(`${baseUrl}/api/user_profile/${userId}`,getHeaderConfigs("application/json", userId, token));
}



export {
    userProfile,
}