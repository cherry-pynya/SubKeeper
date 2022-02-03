import currencyConverter from './currensyConverter';

// ищем стоимость потраченных денег в зависимости от валюьы
export default function calculateTotalCost(stats, cur) {
    let index = 0;
    stats.forEach((el) => {
        index += el['activeMonths'] * el[cur];
    });
    const uniCur = currencyConverter(cur)
    return `За весь период потрачено: ${index} ${uniCur}`;
}