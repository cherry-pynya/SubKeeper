//текстовый вывод опции подписки для виджета подписки
export default function optionConverter(option) {
    switch(option) {
        case 1:
            return 'раз в месяц';
        case 3:
            return 'раз в 3 месяца';
        case 6:
            return 'раз в пол года';
        case 12:
            return 'раз в год';
        case 2:
        case 4:
            return `раз в ${option} месяца`;
        default:
            return `раз в ${option} месяцев`;
    };
}
