import axios from "axios";
import {getHeaderBearerConfigs, TOKEN_KEY} from "../Common/ApiCommon";
import {getEnvOfStorage} from "../../Env";

export function chatUsersMessages(page, size, userId, fromUserId, token) {
    let query = `?page=${page}&size=${size}&user_id=${userId}&from_user_id=${fromUserId}`;
    return axios.get(`${getEnvOfStorage()?.dataUrl}/api/chat_users_messages${query}`,
        getHeaderBearerConfigs("application/json", token));
}

/**
 * Запрос - Получить последнюю переписку двух пользователей пострнично
 * @param {number} page
 * @param {number} size
 * @param {string} userId
 * @param {string} fromUserId
 * @returns {Promise<AxiosResponse<any>>}
 */
function getChatUsersMessagesRequest(page, size, userId, fromUserId) {
    let token = localStorage.getItem(TOKEN_KEY);
    let query = `?page=${page}&size=${size}&user_id=${userId}&from_user_id=${fromUserId}`;
    return axios.get(`${getEnvOfStorage()?.dataUrl}/api/chat_users_messages${query}`,
        getHeaderBearerConfigs("application/json", token));
}

/**
 * Получить последнюю переписку двух пользователей пострнично
 * @param {number} page
 * @param {string} userId
 * @param {string} fromUserId
 * @param {function(data: object, err: any)} callback
 */
export function getChatUsersMessages(page, userId, fromUserId, callback) {
    getChatUsersMessagesRequest(page, 10, userId, fromUserId)
        .then((data) => callback(data, null))
        .catch((err) => callback(null, err));
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
    return axios.get(`${getEnvOfStorage()?.dataUrl}/api/user_profiles_chats${query}`,
        getHeaderBearerConfigs("application/json", token));
}

/**
 * Добавить сообщение в чат
 * @param data
 * @param {string} token
 * @returns {Promise<AxiosResponse<any>>}
 */
export function addMessage(data, token) {
    return axios.post(`${getEnvOfStorage()?.dataUrl}/api/chat/add`, data, getHeaderBearerConfigs("application/json", token));
}

/**
 * Проверить/изменить статус прочтения сообщений в чате
 * @param {string[]} readChatItemIds
 * @param {string[]} writeChatItemIds
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function getChatMessagesByIds(readChatItemIds, writeChatItemIds) {
    let token = localStorage.getItem(TOKEN_KEY);
    return await axios.post(`${getEnvOfStorage()?.dataUrl}/api/chat/apply/messages`,
        {readMessagesIds: readChatItemIds, writeMessagesIds: writeChatItemIds},
        getHeaderBearerConfigs("application/json", token));
}