import { nanoid } from "@reduxjs/toolkit";
import loacaleDate from "./localeDate";

//получает айди юзера, объект из формы и дополняет его для последующей отрпавки в базу
export default function makeSubObject(obj, user) {
    console.log(obj);
    const { name, option, newItem } = obj;
    //Если мы создаем подписку
    if (newItem) {
        obj.canceled = '';
        obj.user = user;
        obj.option = +option;
        obj.active = true;
        obj.letter = name[0];
        obj.id = nanoid();
        obj.date = loacaleDate(obj.date);
    };
    //Если мы редактируем подписку
    delete obj.newItem;
    return obj;
}