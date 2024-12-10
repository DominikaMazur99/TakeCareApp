export const peselToDate = (pesel: string) => {
    const year = parseInt(pesel.substring(0, 2), 10);
    const month = parseInt(pesel.substring(2, 4), 10);
    const day = parseInt(pesel.substring(4, 6), 10);

    let fullYear = year;
    let actualMonth = month;

    if (month >= 1 && month <= 12) {
        fullYear += 1900; // 1900-1999
    } else if (month >= 21 && month <= 32) {
        fullYear += 2000; // 2000-2099
        actualMonth = month - 20;
    } else if (month >= 41 && month <= 52) {
        fullYear += 2100; // 2100-2199
        actualMonth = month - 40;
    } else if (month >= 61 && month <= 72) {
        fullYear += 2200; // 2200-2299
        actualMonth = month - 60;
    } else if (month >= 81 && month <= 92) {
        fullYear += 1800; // 1800-1899
        actualMonth = month - 80;
    }

    return new Date(fullYear, actualMonth - 1, day); // Month is 0-indexed
};
