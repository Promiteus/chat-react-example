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

/**
 * Получить список чатов пользователя постранично
 * @param page
 * @param size
 * @param userId
 * @param token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getUserProfileChatsPageable(page, size, userId, token) {
    let query = `?page=${page}&size=${size}&user_id=${userId}`;
    return axios.get(`${BASE_DATA_URL}/api/user_profiles_chats${query}`,
        getHeaderBearerConfigs("application/json", token));
}