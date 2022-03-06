import axios from "axios";
import {BASE_DATA_URL, getHeaderBearerConfigs} from "../Common/ApiCommon";

/**
 * Получить последнюю переписку двух пользователей пострнично
 * @param {number} page
 * @param {number} size
 * @param {string} userId
 * @param {string} fromUserId
 * @param {string} token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function chatUsersMessages(page, size, userId, fromUserId, token) {
    let query = `?page=${page}&size=${size}&user_id=${userId}&from_user_id=${fromUserId}`;
    return axios.get(`${BASE_DATA_URL}/api/chat_users_messages${query}`,
        getHeaderBearerConfigs("application/json", token));
}

/**
 * Получить список чатов пользователя постранично
 * @param {number} page
 * @param {number} size
 * @param {string} userId
 * @param {string} token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getUserProfileChatsPageable(page, size, userId, token) {
    let query = `?page=${page}&size=${size}&user_id=${userId}`;
    return axios.get(`${BASE_DATA_URL}/api/user_profiles_chats${query}`,
        getHeaderBearerConfigs("application/json", token));
}

/**
 * Добавить сообщение в чат
 * @param data
 * @param {string} token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function addMessage(data, token) {
    return axios.post(`${BASE_DATA_URL}/api/chat/add`, data, getHeaderBearerConfigs("application/json", token));
}

/**
 *
 * @param {string[]} chatItemIds
 * @param {string} token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getChatMessagesByIds(chatItemIds, token) {
    return axios.get(`${BASE_DATA_URL}/api/chat/status/messages`,
        getHeaderBearerConfigs("application/json", token));
}