import { nanoid } from "@reduxjs/toolkit";
import loacaleDate from "./localeDate";

export default function makeSubObject(obj) {
    const { name, option } = obj;
    obj.canceled = true;
    obj.option = +option;
    obj.active = false;
    obj.letter = name[0];
    obj.id = nanoid();
    obj.date = loacaleDate(obj.date);
    return obj;
}