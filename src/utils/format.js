export const removeLeadingZeros = (paddedNum) => {
    if (!paddedNum || isNaN(paddedNum)) {
        return "Invalid input";
    }
    return parseInt(paddedNum, 10);
}

export const padDigits = (num, length = 3) => {
    return num.toString().padStart(length, '0');
}