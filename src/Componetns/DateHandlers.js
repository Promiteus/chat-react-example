
//Разница двух дат в годах
export function dateDiffYears(dateStr1, dateStr2) {
    let date1 = new Date(dateStr1);
    let date2 = new Date(dateStr2);
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.trunc(timeDiff/(1000 * 3600 * 24 * 365));
}