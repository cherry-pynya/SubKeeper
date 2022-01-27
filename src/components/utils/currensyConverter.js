//возвращает юникод нужной валюты
export default function currencyConverter(str) {
    switch(str) {
        case 'RUB':
            return '\u20BD';
        case 'USD':
            return '\u0024';
        case 'EUR':
            return '\u20AC';
        case 'GDP':
            return '\u00A3';
        default:
            return false;
    }
}