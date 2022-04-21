import {getHeaderBearerConfigs, TOKEN_KEY} from "../Common/ApiCommon";
import axios from "axios";
import {getEnvOfStorage} from "../../Env";


export function uploadImageFile(formData) {
    let token = localStorage.getItem(TOKEN_KEY);
    return axios.post(`${getEnvOfStorage()?.authUrl}/api/uploads`, formData,  getHeaderBearerConfigs("multipart/form-data", token));
}