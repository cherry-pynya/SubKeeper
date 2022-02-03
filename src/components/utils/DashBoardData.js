import moment from "moment";

// добываем данные для дашбоарда из массива со статистикой
export default class DashBoardData {
    constructor (stats) {
        this.stats = stats;
        this.result = [];
        this.cur = {
            "EUR": '\u20AC',
            "USD": '\u0024',
            "RUB": '\u20BD',
        }
    }
    //самая дешавая подписка
    mostCheap() {
        const arr = this.priceSortedStats();
        const el = arr[arr.length - 1];
        return {
            category: 'Самая не дорогая подписка',
            name: this.name(el),
            show: `${this.cost(el)}${this.cur[el["currency"]]}`,
        }
    }
    //ближайший платеж
    closestDate() {
        const currentDate = moment(new Date()).get('date');
        const arr = [...this.stats];
        const arr2 = arr.filter((el) => el.payDay >= currentDate);
        arr2.sort((a, b) => {
            return a.payDay - b.payDay;
        });
        let el;
        if (arr2.length === 0 ) {
            el = arr[0];
        } else {
            el = arr2[0];
        }
        const date = this.getPayDay(el);
        return {
            category: 'Ближайший платеж',
            name: this.name(el),
            show: `${this.cost(el)}${this.cur[el["currency"]]} ${date}`,
        }
    }
    // самая дорогая подписка
    mostExpensive() {
        const arr = this.priceSortedStats();
        const el = arr[0];
        return {
            category: 'Самая дорогая подписка',
            name: this.name(el),
            show: `${this.cost(el)}${this.cur[el["currency"]]}`,
        }
    }
    //возвразает отсортироыанную по стоимости подписки статистику
    priceSortedStats() {
        const arr = [...this.stats];
        arr.sort((a, b) => {
            return b["RUB"] - a["RUB"];
        });
        return arr;
    }
    //достаем имя подписки
    name(el) {
        return el["name"].toUpperCase();
    }
    //достаем стоимость подписки
    cost(el) {
        return el[el["currency"]] * el["option"];
    }

    init() {
        return [this.mostExpensive(), this.mostCheap(), this.closestDate()];
    }
    //узнаем дату следующего платежа
    getPayDay(el) {
        console.log(el)
        const payDay = el['payDay'];
        const currentDay = moment(new Date()).get('date');
        const dateOfPayment = moment(new Date()).add((payDay - currentDay), 'd').format('L');
        return dateOfPayment;
    }
}