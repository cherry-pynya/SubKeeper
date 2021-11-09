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
        const costPerMonth = (cost / option).toFixed(2);
        const activeMonths = Math.floor(moment().diff(moment(date), 'months', true));
        const [RUB, USD, EUR] = this.costPerCurrency(costPerMonth, currency)
        this.addToStats({name, RUB, activeMonths, USD, EUR, id, currency, option, cost, active, canceled});
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

    return arr;
  };

  getRate(str) {
      const obj = this.cur.filter((el) => el['CharCode'] === str)[0];
      return obj['Value'].toFixed(2);
  }

  getTotalCost() {
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
    this.costPerMonth();
    this.getTotalCost();
    return this.statistics;
  };
}

// вывод
// stats = [{name: str, RubPerMont: int, EurPerMoth: int, USDPerMoth: int, active: bool, cur: str, totalCost: int}]
