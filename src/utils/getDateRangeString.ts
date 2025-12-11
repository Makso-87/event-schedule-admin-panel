import { IEvent } from '../interfaces';

const getTime = (time: string) => {
    return time ? `, ${time}` : '';
};

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
};

export const getDateRangeString = (dates: Pick<IEvent, 'startDate' | 'startTime' | 'endDate' | 'endTime'>) => {
    const { startDate, startTime, endDate, endTime } = dates;
    const start = `${formatDate(startDate)}${getTime(startTime)}`;
    const end = ` - ${formatDate(endDate)}${getTime(endTime)}`;
    return `${start}${endDate ? end : ''}`;
};
