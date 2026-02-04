import { IEvent } from '../interfaces';

const getTime = (time: string) => {
    return time ? ` ${time}` : '';
};

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
};

export const getDateRangeString = (dates: Pick<IEvent, 'startDate' | 'startTime' | 'endTime'>) => {
    const { startDate, startTime, endTime } = dates;
    const start = `${formatDate(startDate)}${getTime(startTime)}`;
    const end = ` - ${getTime(endTime)}`;

    return `${start}${endTime ? end : ''}`;
};
