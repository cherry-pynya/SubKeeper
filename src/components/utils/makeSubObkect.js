import { nanoid } from "@reduxjs/toolkit";
import loacaleDate from "./localeDate";

export default function makeSubObject(obj, user) {
    const { name, option } = obj;
    obj.canceled = '';
    obj.user = user;
    obj.option = +option;
    obj.active = true;
    obj.letter = name[0];
    obj.id = nanoid();
    obj.date = loacaleDate(obj.date);
    return obj;
}