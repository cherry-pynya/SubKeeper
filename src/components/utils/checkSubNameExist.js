import checkStringEquality from "./checkStringEquality";

export default function checkSubNameExist(array, string) {
    array.forEach((el) => {
        if (checkStringEquality(el.name, string)) return true;
    });
    return false;
};
