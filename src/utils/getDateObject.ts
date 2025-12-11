const isISODateString = (dateString: string) => {
    const regExp = new RegExp(/[z:]/, 'i');
    return regExp.test(dateString);
};

export const getDateObject = (dateString: string): Date | null => {
    if (dateString) {
        if (isISODateString(dateString)) {
            return new Date(dateString);
        }

        const [year, month, day] = dateString.split('-');
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    return null;
};
