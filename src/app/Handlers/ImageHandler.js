/**
 * Выдать флаг согласия, если изображение главное
 * @param {string} alt
 * @param {string} imgUrl
 * @returns {boolean}
 */
export function isMainPhoto(alt, imgUrl) {
    if (!(alt) || !(imgUrl)) {
        return false;
    }
    let fileName = imgUrl.split('file_id=')?.length === 2 ? imgUrl.split('file_id=')[1]: '';
    return (alt === fileName);
}