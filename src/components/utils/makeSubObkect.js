import { nanoid } from "@reduxjs/toolkit";

//получает айди юзера, данные из формы и дополняет его для последующей отрпавки в базу
export default function makeSubObject(obj, user) {
    const { name, option } = obj;
    obj.canceled = '';
    obj.user = user;
    obj.option = +option;
    obj.active = true;
    obj.letter = name[0];
    obj.id = nanoid();
    delete obj.newItem;
    return obj;
}