import checkStringEquality from "./checkStringEquality";

export default function checkSubNameExist(array, string = '') {
    if (array.length === 0) {
        return false;
    };
    const el = array.find((el) => el.name === string);
    if (typeof el === 'undefined') {
        return false;
    } else {
        const { name } = el;
        if (checkStringEquality(name, string)) {
            return true;
        } else {
            return false;
        }
    }
};