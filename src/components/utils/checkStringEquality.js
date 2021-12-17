//проверяет равны ли строки
export default function checkStringEquality(str1, str2) {
    if (handleString(str1) === handleString(str2)) return true;
    return false;
};

function handleString(str) {
    return str.trim().toLowerCase();
};