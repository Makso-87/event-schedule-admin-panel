import React, { MouseEventHandler } from 'react';
import classes from './EventPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_EVENTS_PAGE } from '../../constants';
import { useAppSelector } from '../../hooks/redux-toolkit-hooks';

export const EventPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const events = useAppSelector((state) => state.eventsList.events);
    const { name, category, startDate, endDate, startTime, endTime, lent, url, place } =
        events.find((event) => event.id === id) || {};

    const onButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        navigate(ROUTE_EVENTS_PAGE);
    };

    return (
        <div className={classes.EventPage}>
            <button onClick={onButtonClick}>Назад</button>
            <h2>{name}</h2>

            <div>
                <span>Категория: </span>
                <span style={{ background: category.color }}>{category.name}</span>
            </div>

            <div>
                <span>Начало: </span>
                <span>{`${startDate}${!!startTime ? `, ${startTime}` : ''}`}</span>
            </div>

            <div>
                <span>Конец: </span>
                <span>{`${endDate}${endTime ? `, ${endTime}` : ''}`}</span>
            </div>

            <div>
                <span>Место: </span>
                <span>{place}</span>
            </div>

            <div>
                <span>Пост: </span>
                <span>{lent}</span>
            </div>

            <div>
                <span>Ссылка: </span>
                <span>{url}</span>
            </div>
        </div>
    );
};
