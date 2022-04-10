const ENV_PARAMS = 'env_params';

/**
 * Сохранить параметры окружения
 * @param params
 */
export function setEnvToStorage(params) {
    localStorage.setItem(ENV_PARAMS, JSON.stringify(params));
}

/**
 * Получить параметры окружения
 * @returns {string}
 */
export function getEnvOfStorage() {
    return localStorage.getItem(ENV_PARAMS) ? JSON.parse(localStorage.getItem(ENV_PARAMS)) : null;
}