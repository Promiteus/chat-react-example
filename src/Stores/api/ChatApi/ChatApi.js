import axios from "axios";
import {BASE_DATA_URL, getHeaderBearerConfigs} from "../Common/ApiCommon";

/**
 * Сохранить/изменить профиль пользователя
 * @param profile
 * @param token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function chatUsersMessages(profile, token) {
    return axios.post(`${BASE_DATA_URL}/api/user_profile`, profile, getHeaderBearerConfigs("application/json", token));
}