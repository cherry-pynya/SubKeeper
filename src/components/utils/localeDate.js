import moment from "moment";
import 'moment/locale/ru';

export default function loacaleDate(date) {
    return moment(date).locale('ru').format('L');
}
