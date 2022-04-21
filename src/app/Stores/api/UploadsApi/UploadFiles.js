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

const saveFile = (file, userId) => {
    if ((file) && (userId)) {
        uploadImageFile(getFormData(file, userId))
            .then((res) => {
                console.log("data: "+JSON.stringify(res));
            })
            .catch(err => console.log("upload error: "+err));
    }
}

const deleteFile = (file, userId) => {
    if ((file) && (userId)) {
        deleteImageFile(getFormData(userId, file?.name))
            .then((res) => {
                console.log("data: "+JSON.stringify(res));
            })
            .catch(err => console.log("upload error: "+err));
    }
}

export {
    saveFile,
    deleteFile,
}