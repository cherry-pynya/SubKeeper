import loacaleDate from "./localeDate";

//помогает дополнить объект подписки, если тот делают активным/неактивным
export default function changeValidity(item) {
    const { active, date } = item;
    // проверяем текущий статус подписки
    if (active === true) {
        const newCanceled = loacaleDate(new Date());
        if ('reactiveted' in item ) {
            // если подписку уже ркактивировали, то добавляем в астивные периоды новый перио активности
            const { activatedDate } = item;
            let arr = Array.from(item.activePeriods);
            arr.push({activatedDate, canceled: newCanceled});
            item['activePeriods'] = arr;
        } else {
            // если ее не реактивировали, то создаем маасив с активными периодами и добавляем туда первый
            item['activePeriods'] = [];
            item.activePeriods.push({date, canceled: newCanceled});
        }
        //выключаем подписку и обновляем дату выключения
        item.active = false;
        item.canceled = loacaleDate(new Date());
    } 
    if (active === false) {
        //включаем подписку и ставим новую дату активации
        item['reactiveted'] = true;
        item.active = true;
        item.activatedDate = loacaleDate(new Date());
    }
    return item;
};