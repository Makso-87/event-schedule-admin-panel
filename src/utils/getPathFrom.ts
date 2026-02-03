import { Location } from 'react-router';

export const getPathFrom = (location: Location): string => {
    const { pathname } = location.state?.from ?? {};

    return pathname;
};
