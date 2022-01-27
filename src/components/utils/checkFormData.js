import checkSubNameExist from "./checkSubNameExist";

//получаем данные из формы и массив с подписками и проверяем валидность данных их формы
export default function checkFormData(data, array) {
    const { name, cost, date } = data;

    //приводим даты к цифрам для убобного сравнения
    const now = new Date().getTime();
    const millenium = new Date('2000-01-01T00:00:00').getTime();
    const check = new Date(date).getTime();

    //проверяем
    if (name === "") {
        return mistakes.noName;
    }
    if (name.length > 20) {
        return mistakes.toBigPrice;
    }
    if (cost === 0 || cost === '') {
        return mistakes.noPrice;
    }
    if (cost > 100000) {
        return mistakes.toBigPrice;
    }
    if ((now - check) < 0) {
        return mistakes.toBigDate;
    }
    if ((check - millenium) < 0) {
        return mistakes.toSmallDate;
    }
    if (checkSubNameExist(array, name)) {
        return mistakes.nameExist;
    }
    //если ошибка есть, то функция вернет строку с ошибкой, если все хорошо то false
    return false;
}

const mistakes = {
    toBigName: "Название подписки должно быть не более 20 символов!",
    noName: "Пожалуйста, введите название подписки!",
    noPrice: "Пожалуйста, введите стоимость подписки!",
    toBigPrice: "Цена не должна превышать 100 000!",
    toSmallDate: "Дата должна быть не раньше 1 Января 2000 года!",
    toBigDate: "Дата должна быть не позднее чем сегодня!",
    nameExist: "У вас уже есть подписка с таким именем!"
};