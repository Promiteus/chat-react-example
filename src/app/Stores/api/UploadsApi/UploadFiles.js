import {getHeaderBearerConfigs, TOKEN_KEY} from "../Common/ApiCommon";
import axios from "axios";
import {getEnvOfStorage} from "../../Env";



function uploadImageFile(formData) {
    let token = localStorage.getItem(TOKEN_KEY);
    return axios.post(`${getEnvOfStorage()?.dataUrl}/api/uploads`, formData,  getHeaderBearerConfigs("multipart/form-data", token));
}

function deleteImageFile(userId, fileName) {
    let token = localStorage.getItem(TOKEN_KEY);
    return axios.delete(`${getEnvOfStorage()?.dataUrl}/api/uploads?user_id=${userId}&file_id=${fileName}`,  getHeaderBearerConfigs("multipart/form-data", token));
}

const getFormData = (file, userId) => {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('file', file);
    return formData;
}


/**
 * Сохранить файл в профиль с userId
 * @param {any} file
 * @param {string} userId
 * @param {function(res: any, err: any)} callback
 */
const saveFile = (file, userId, callback) => {
    if ((file) && (userId)) {
        uploadImageFile(getFormData(file, userId))
            .then((res) => callback(res, null))
            .catch(err => callback(null, err));
    }
}

/**
 * Удаление файла из профиля по имени файла
 * @param {string} fileName
 * @param {string} userId
 * @param {function(res: any, err: any)} callback
 */
const deleteFile = (fileName, userId, callback) => {
    if ((fileName) && (userId)) {
        deleteImageFile(userId, fileName)
            .then((res) => {
                callback(res, null);
            })
            .catch(err => {
                callback(null, err);
            });
    }
}

export {
    saveFile,
    deleteFile,
}