import currencyConverter from './currensyConverter';

export default function MonthlyCost(stats, cur) {
    console.log(stats)
    let index = 0;
    stats.forEach((el) => {
        if (el.active) {
            index = Number((index + el[cur]).toFixed(2));
        }
    });
    const str = currencyConverter(cur);
    return `Всего в месяц: ${index} ${str}`
}