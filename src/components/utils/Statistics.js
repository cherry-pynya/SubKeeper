import moment from "moment";

export default class Statistics {
  constructor(data, cur) {
    this.data = data;
    this.cur = cur;
    this.date = moment();
    // сколько ты тратишь в месяц
    // сколько всего заплатил
    // массив с парой сервис/всего потрачено
    // массив с парой ервис/стоимость подписки
    // и все это в трех валютах
    this.statistics = [];
  }

  costPerMonth() {
    this.data.forEach((el) => {
        const {cost, option, date, name, currency, id, active, canceled} = el;
        const costPerMonth = (cost / option).toFixed(2); // считаем месяную стоимость подписки
        const [RUB, USD, EUR] = this.costPerCurrency(costPerMonth, currency); // считаем месяную стоимость подписки в других валютах
        let activeMonths; // считаем количество активных месяцев
        if ('reactiveted' in el) {
          let index = 0;
          el.activePeriods.forEach((item) => {
            index += Math.floor(moment(item.canceled).diff(moment(item.date), 'months', true));
          });
          activeMonths = index;
        } else {
          activeMonths = Math.floor(moment().diff(moment(date), 'months', true));
        }
        this.addToStats({name, RUB, activeMonths, USD, EUR, id, currency, option, cost, active, canceled}); //добавляем все в объект со статистикой
    });
  };

  addToStats(obj) {
    this.statistics.push(obj);
  }

  costPerCurrency(costPerMonth, currency) {
    //метод стоимость подписки в валюте исходя из выбранной валюты
    const usdRate = this.getRate('USD');
    const eurRate = this.getRate('EUR');
    let rub;
    let usd;
    let eur;
    if (currency === 'RUB') {
        rub = costPerMonth;
        usd = costPerMonth / usdRate;
        eur = costPerMonth / eurRate;
    };
    if (currency === 'EUR') {
        rub = costPerMonth * eurRate;
        usd = costPerMonth * (eurRate / usdRate);
        eur = costPerMonth;
    };
    if (currency === 'USD') {
        rub = costPerMonth * usdRate;
        usd = costPerMonth;
        eur = costPerMonth * (usdRate / eurRate);
    };

    const arr = [+rub, +usd, +eur].map((el) => +(el.toFixed(2)))

    return arr;
  };

  getRate(str) {
    //обрабатываем обхект с валютами и получаем из него данные
    const obj = this.cur.filter((el) => el['CharCode'] === str)[0];
    return obj['Value'].toFixed(2);
  }

  getTotalCost() {
    //получаем сумму потраченную за весь перилд
    this.statistics.forEach((el) => {
      const {activeMonths, option, currency, cost } = el;
      if (currency in el) {
        if (option >= activeMonths) {
          el.totalCost = cost;
        } else {
          const index = (activeMonths - (activeMonths % option)) / option;
          el.totalCost = index * cost;
        }
      }
    });
  }

  init() {
    // возвращаем массив со статистикой
    this.costPerMonth();
    this.getTotalCost();
    return this.statistics;
  };
}

// вывод
// stats = [{name: str, RubPerMont: int, EurPerMoth: int, USDPerMoth: int, active: bool, cur: str, totalCost: int}]
