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

function getHeaderConfigs(contentType, userId) {
    let token = localStorage.getItem(userId);
    return { headers: { "Content-Type": contentType,  "Authorization" : `Bearer ${token}`}};
}

/**
 * Сохранить/изменить профиль пользователя
 * @param profile
 * @returns {Promise<AxiosResponse<any>>}
 */
export function saveUserProfile(profile) {
    return axios.post(baseUrl+'/api/user_profile', profile, getHeaderConfigs("application/json", profile.id));
}

/**
 * Получить профиль пользователя по userId
 * @param userId
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getUserProfile(userId) {
    return axios.get(baseUrl+'/api/user_profile/'+userId,getHeaderConfigs("application/json", userId));
}



export {
    userProfile,
}