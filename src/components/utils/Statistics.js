import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";

const mockData = [
    {
      id: nanoid(),
      name: "kinopoisk",
      cost: 169,
      currency: "RUB",
      option: 1,
      date: "20191011",
      letter: "k",
      active: true,
      canceled: null,
    },
    {
      id: nanoid(),
      name: "ivy",
      cost: 500,
      currency: "RUB",
      option: 3,
      date: "20200505",
      letter: "i",
      active: true,
      canceled: null,
    },
    {
      id: nanoid(),
      name: "psn",
      cost: 2500,
      currency: "RUB",
      option: 6,
      date: "20210101",
      letter: "p",
      active: false,
      canceled: '20120613',
    },
    {
      id: nanoid(),
      name: "spotify",
      cost: 1000,
      currency: "RUB",
      option: 12,
      date: "20170101",
      letter: "s",
      active: true,
      canceled: null,
    },
]

const cur = [
    {
        "ID": "R01235",
        "NumCode": "840",
        "CharCode": "USD",
        "Nominal": 1,
        "Name": "Доллар США",
        "Value": 70.8623,
        "Previous": 70.9904
    },
    {
        "ID": "R01239",
        "NumCode": "978",
        "CharCode": "EUR",
        "Nominal": 1,
        "Name": "Евро",
        "Value": 82.4979,
        "Previous": 82.6399
    }
]

export default class Statistics {
  constructor(data, currency) {
    this.data = data;
    this.cur = currency;
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
        const {cost, option, date, name, currency} = el;
        const costPerMonth = (cost / option).toFixed(2);
        const activeMonths = Math.floor(moment().diff(moment(date), 'months', true));
        const [costPerMonthRUB, costPerMonthUSD, costPerMonthEUR] = this.costPerCurrency(costPerMonth, currency)
        this.addToStats({name, costPerMonthRUB, activeMonths, costPerMonthUSD, costPerMonthEUR});
    });
  };

  addToStats(obj) {
    this.statistics.push(obj);
  }

  costPerCurrency(costPerMonth, currency) {
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
    console.log(arr)

    return arr;
  };

  getRate(str) {
      const obj = this.cur.filter((el) => el['CharCode'] === str)[0];
      return obj['Value'].toFixed(2);
  }

  init() {
    this.costPerMonth();
    return this.statistics;
  };
}

// вывод
// stats = [{name: str, RubPerMont: int, EurPerMoth: int, USDPerMoth: int, active: bool, cur: str, totalCost: int}]
