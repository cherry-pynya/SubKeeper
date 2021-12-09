//помогает доставть курс валюты из объекта, который приходит от сервера
export default function extractCurrency(data) {
    const arr = [];
    for (let key in data.Valute) {
        if (key === 'USD' || key === 'EUR') {
            arr.push(data.Valute[key]);
        }
    }
    return arr;
}