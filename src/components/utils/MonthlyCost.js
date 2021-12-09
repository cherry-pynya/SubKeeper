import currencyConverter from './currensyConverter';

//текстовый вывод всей потраченой на подписку суммы для виджета подписки
export default function MonthlyCost(stats, cur) {
    let index = 0;
    stats.forEach((el) => {
        if (el.active) {
            index = Number((index + el[cur]).toFixed(2));
        }
    });
    const str = currencyConverter(cur);
    return `Всего в месяц: ${index} ${str}`
}