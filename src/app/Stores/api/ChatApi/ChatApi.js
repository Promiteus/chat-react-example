import axios from "axios";
import {BASE_DATA_URL, getHeaderBearerConfigs} from "../Common/ApiCommon";

/**
 * Получить последнюю переписку двух пользователей пострнично
 * @param page
 * @param size
 * @param userId
 * @param fromUserId
 * @param token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function chatUsersMessages(page, size, userId, fromUserId, token) {
    let query = `?page=${page}&size=${size}&user_id=${userId}&from_user_id=${fromUserId}`;
    return axios.get(`${BASE_DATA_URL}/api/chat_users_messages${query}`,
        getHeaderBearerConfigs("application/json", token));
}