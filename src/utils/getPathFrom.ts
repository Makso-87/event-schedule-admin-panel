import { Location } from 'react-router';
import { ROUTE_EVENTS_PAGE } from '../constants';

export const getPathFrom = (location: Location): string => {
    const { pathname } = location.state?.from ?? {};

    if (!pathname || pathname === '/') {
        return ROUTE_EVENTS_PAGE;
    }

    return pathname;
};
