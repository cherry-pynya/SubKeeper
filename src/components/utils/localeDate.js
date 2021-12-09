import moment from "moment";
import 'moment/locale/ru';

//локализация объекта даты
export default function loacaleDate(date) {
    return moment(date).locale('ru').format('L');
}
