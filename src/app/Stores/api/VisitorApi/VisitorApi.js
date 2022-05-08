import {getHeaderBearerConfigs, TOKEN_KEY} from "../Common/ApiCommon";
import axios from "axios";
import {getEnvOfStorage} from "../../Env";

/**
 *
 * @param {string} userId
 * @param {string} visitorUserId
 * @returns {Promise<AxiosResponse<any>>}
 */
function updateUserVisitorRequest(userId, visitorUserId) {
    let token = localStorage.getItem(TOKEN_KEY);
    return axios.put(`${getEnvOfStorage()?.dataUrl}/api/user/visitor?user_id=${userId}&visitor_user_id=${visitorUserId}`, {},  getHeaderBearerConfigs("application/json", token));
}

/**
 * Обновить дату посещения или добавить нового посетителя
 * @param {string} userId
 * @param {string} visitorUserId
 * @param {function(data: object, err: any)} callback
 */
const updateUserVisitor = (userId, visitorUserId, callback) => {
    if ((userId) && (visitorUserId)) {
        updateUserVisitorRequest(userId, visitorUserId)
            .then(data => callback(data, null))
            .catch(err => {callback(null, err); console.log("updateUserVisitor Error: "+err)});
    }
}

export {
    updateUserVisitor,
}