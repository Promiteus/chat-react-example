
const BASE_AUTH_URL = 'http://localhost:8081';
const TOKEN_KEY = 'token';
const USER_ID_KEY = 'userId';
const BASE_DATA_URL = 'http://localhost:8090';
const WS_STOMP_URL = 'http://localhost:10800/wsApp';

const PROFILE_CHATS_PAGE_SIZE = 20;

/**
 * Сформировать заголовок с токеном авторизации
 * @param contentType
 * @param token
 * @returns {{headers: {authorization: string, contentType}}}
 */
function getHeaderBearerConfigs(contentType, token) {
    return { headers: { contentType: contentType,  authorization : `Bearer ${token}`}};
}

const initialRequestData = ({state, action}) => {
    if (state.loading === false) {
        state.loading = true
        state.response = {};
        state.status = 0;
        state.currentRequestId = action.meta.requestId;
    }
}

const fulfilledRequestData = ({state, action}) => {
    const { requestId } = action.meta;
    if (
        (state.loading === true) &&
        (state.currentRequestId === requestId)
    ) {
        state.response = action.payload.data;
        state.status = action.payload.status;
        state.error = '';
        state.currentRequestId = undefined;
        state.loading = false;
    }
}

const rejectRequestData = ({state, action}) => {
    const { requestId } = action.meta
    if (
        (state.loading === true) &&
        (state.currentRequestId === requestId)
    ) {
        state.error = action.error.message;
        state.response = {};
        if (action.error.message) {
            state.status = action.error.message?.match(/[0-9]+/);
        } else if (action.payload) {
            state.status = action.payload.status;
            state.error = action.payload.error;
        } else {
            state.status = 0;
        }
        state.loading = false
        state.currentRequestId = undefined
    }
}
/**
 * Получить целочисленный статус ошибки
 * @param {string} err
 * @returns {number}
 */
const networkErrStatus = (err) => {
    let status = 404;
    if ((err?.toString().match(/[0-9]+/) !== null) && ((+err?.toString().match(/[0-9]+/) > 0))) {
        status = err?.toString().match(/[0-9]+/);
    } else {
        status = 500;
    }
    return +status;
}

export {
    initialRequestData,
    fulfilledRequestData,
    rejectRequestData,
    BASE_AUTH_URL,
    USER_ID_KEY,
    TOKEN_KEY,
    BASE_DATA_URL,
    getHeaderBearerConfigs,
    PROFILE_CHATS_PAGE_SIZE,
    networkErrStatus,
    WS_STOMP_URL,
}