import React, { useEffect } from 'react';
import classes from './EventsPage.module.scss';
import { LeftSideBar } from '../LeftSideBar/LeftSideBar';
import { Wrap } from '../Wrap/Wrap';
import { EventsList } from '../EventsList/EventsList';
import { getEvents } from '../../api/getEvents';
import { Outlet, useMatch } from 'react-router-dom';
import { ROUTE_EVENT_PAGE, ROUTE_EVENTS_PAGE, ROUTE_NEW_EVENT_PAGE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-toolkit-hooks';
import { setEvents } from '../../store/slices/eventsListSlice';

export const EventsPage = () => {
    const events = useAppSelector((state) => state.eventsList.events);
    const dispatch = useAppDispatch();
    const eventRoute = useMatch(`${ROUTE_EVENTS_PAGE}/${ROUTE_EVENT_PAGE}`);
    const newEventRoute = useMatch(`${ROUTE_EVENTS_PAGE}/${ROUTE_NEW_EVENT_PAGE}`);

    useEffect(() => {
        (async () => {
            const eventsList = await getEvents();
            dispatch(setEvents(eventsList));
        })();
    }, []);

    return (
        <div className={classes.EventsPage}>
            <Wrap>
                <div className={classes.LeftSide}>
                    <LeftSideBar />
                </div>

                <div className={classes.RightSide}>
                    {eventRoute || newEventRoute ? <Outlet /> : <EventsList events={events} />}
                </div>
            </Wrap>
        </div>
    );
};
