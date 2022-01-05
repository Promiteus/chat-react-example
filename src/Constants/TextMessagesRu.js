

const SOMETHING_WENT_WRONG = 'Что-то пошло не так!';
const SUCH_USER_EXISTS = "Такой пользователь уже есть!";
const MSG_YOU = "Вы";

const CAPTION_CHATS = "Чаты";
const CAPTION_GUESTS = "Гости";
const CAPTION_EMPTY_CHAT = "Здесь пока нет чатов";

/**
 * Уведомление при не 200 статусе
 * @param stat Number
 * @returns {string}
 */
export function getNotificationMsg(stat) {
    if (+stat === 403) {
        return `Неверный логин или пароль. Код ${+stat}`;
    } else if (+stat !== 200) {
        return `Что-то пошло не так!`;
    }
}

export {
    SOMETHING_WENT_WRONG,
    SUCH_USER_EXISTS,
    MSG_YOU,
    CAPTION_CHATS,
    CAPTION_GUESTS,
    CAPTION_EMPTY_CHAT,
}