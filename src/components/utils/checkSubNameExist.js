import checkStringEquality from "./checkStringEquality";

export default function checkSubNameExist(array, string = '') {
    let index = 0;
    let checkSum = true;
    while (checkSum) {
        if (checkStringEquality(array[index].name, string)) {
            checkSum = false;
        } else {
            index += 1;
        }
    };
    if (checkSum) {
        return false;
    } else {
        return true;
    }
};
