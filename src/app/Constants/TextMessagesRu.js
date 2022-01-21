

const SOMETHING_WENT_WRONG = 'Что-то пошло не так!';
const SUCH_USER_EXISTS = "Такой пользователь уже есть!";
const MSG_YOU = "Вы";
const MSG_NO = "Нет";
const MSG_YES = "Есть";

const CAPTION_CHATS = "Чаты";
const CAPTION_GUESTS = "Гости";
const CAPTION_EMPTY_CHAT = "Здесь пока нет чатов";
const CAPTION_SEARCH = "Поиск";
const CAPTION_EMPTY_PROFILES = "Здесь пока нет людей.";
const CAPTION_EMPTY_GUESTS = "У вас пока нет гостей.";
const CAPTION_SAVE = "Сохранить";

const SUBTITLE_MY_PHOTOS = "Мои фото";
const SUBTITLE_ABOUT_ME = "О себе";
const SUBTITLE_SEX_ORIENTATION = "Ориентация";
const SUBTITLE_HOBBIES = "Интересы";
const SUBTITLE_WHOM_LOOKING_FOR = "Кого ищу";
const SUBTITLE_SEX = "Пол";
const SUBTITLE_CHILDS = "Дети";
const SUBTITLE_FAMILY_STATUS = "Семейное положение";

const CAPTION_WRITE = "Написать";
const CAPTION_COMPLAIN = "Пожаловаться";



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
    CAPTION_SEARCH,
    CAPTION_EMPTY_PROFILES,
    CAPTION_EMPTY_GUESTS,
    SUBTITLE_ABOUT_ME,
    SUBTITLE_MY_PHOTOS,
    SUBTITLE_SEX_ORIENTATION,
    SUBTITLE_WHOM_LOOKING_FOR,
    SUBTITLE_SEX,
    SUBTITLE_HOBBIES,
    CAPTION_WRITE,
    CAPTION_COMPLAIN,
    SUBTITLE_CHILDS,
    MSG_NO,
    MSG_YES,
    SUBTITLE_FAMILY_STATUS,
    CAPTION_SAVE,
}