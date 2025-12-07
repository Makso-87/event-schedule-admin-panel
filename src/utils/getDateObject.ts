export const getDateObject = (dateString: string): Date | null => {
    if (dateString) {
        const [year, month, day] = dateString.split('-');
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    return null;
};
