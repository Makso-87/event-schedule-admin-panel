import React, { MouseEventHandler, useEffect, useState } from 'react';
import classes from './EventPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_EVENTS_PAGE, setOfInputsEvent } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-toolkit-hooks';
import { Button } from '@mantine/core';
import { InputMapper } from '../InputMapper/InputMapper';
import { getCategories } from '../../api/getCategories';
import { setCategories } from '../../store/slices/categoriesListSlice';
import { setEvents } from '../../store/slices/eventsListSlice';
import { getEvents } from '../../api/getEvents';
import { getDateObject } from '../../utils/getDateObject';
import { TState } from '../../types';
import { updateEvent } from '../../api/updateEvent';
import { hasDifferenceShallow } from '../../utils/hasDifference';

export const EventPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const events = useAppSelector((state) => state.eventsList.events);
    const { name, category, startDate, startTime, endTime, lent, url, place } =
        events.find((event) => event.id === id) || {};

    const categories = useAppSelector((state) => state.categoriesList.categories);
    const categoriesSelectData = categories.map((item) => item.name);

    const onBackButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        navigate(ROUTE_EVENTS_PAGE);
    };

    const [stateName, setStateName] = useState(name ?? null);
    const [stateStartDate, setStateStartDate] = useState(startDate ?? null);
    const [stateStartTime, setStateStartTime] = useState(startTime ?? null);
    const [stateEndTime, setStateEndTime] = useState(endTime ?? null);
    const [statePlace, setStatePlace] = useState(place ?? null);
    const [stateUrl, setStateUrl] = useState(url ?? null);
    const [stateLent, setStateLent] = useState(lent ?? null);
    const [stateCategory, setStateCategory] = useState(category.name ?? null);
    const [errors, setErrors] = useState([]);

    const hasChanges = () => {
        const currentCategory = categories.find((item) => item.name === stateCategory);
        const oldData = {
            name,
            categoryId: category.id,
            startDate,
            startTime,
            endTime,
            lent,
            url,
            place,
        };

        const newData = {
            name: stateName,
            categoryId: currentCategory ? currentCategory.id : null,
            startDate: stateStartDate ? getDateObject(stateStartDate)?.toISOString() : stateStartDate,
            startTime: stateStartTime,
            endTime: stateEndTime,
            lent: stateLent,
            url: stateUrl,
            place: statePlace,
        };

        return hasDifferenceShallow(oldData, newData);
    };

    const states: Record<string, TState> = {
        name: { state: stateName, setState: setStateName },
        startDate: { state: stateStartDate, setState: setStateStartDate },
        startTime: { state: stateStartTime, setState: setStateStartTime },
        endTime: { state: stateEndTime, setState: setStateEndTime },
        place: { state: statePlace, setState: setStatePlace },
        url: { state: stateUrl, setState: setStateUrl },
        lent: { state: stateLent, setState: setStateLent },
        category: { state: stateCategory, setState: setStateCategory },
    };

    const onButtonClick: MouseEventHandler = async (event) => {
        event.preventDefault();

        const errorsList = new Set();

        if (!stateName) {
            errorsList.add({
                message: 'Необходимо ввести название мероприятия',
            });
        }

        if (!stateStartDate) {
            errorsList.add({
                message: 'Необходимо указать дату начала мероприятия',
            });
        }

        if (!statePlace) {
            errorsList.add({
                message: 'Необходимо указать место проведения мероприятия',
            });
        }

        if (!stateCategory) {
            errorsList.add({
                message: 'Необходимо выбрать категорию мероприятия',
            });
        }

        if (stateName && stateStartDate && statePlace && stateCategory) {
            const category = categories.find((item) => item.name === stateCategory);

            const { data, errors } = await updateEvent({
                id,
                name: stateName,
                startDate: getDateObject(stateStartDate),
                startTime: stateStartTime,
                endTime: stateEndTime,
                place: statePlace,
                lent: stateLent,
                url: stateUrl,
                categoryId: category?.id,
            });

            if (data) {
                const eventsList = await getEvents();
                dispatch(setEvents(eventsList));
                navigate(ROUTE_EVENTS_PAGE);
            } else {
                errors.forEach((error: Error) => errorsList.add(error));
            }
        }

        setErrors([...Array.from(errorsList)]);
    };

    useEffect(() => {
        if (!categories.length) {
            (async () => {
                const { categories, errors } = await getCategories();

                if (categories) {
                    dispatch(setCategories(categories));
                }
            })();
        }
    }, []);

    return (
        <div className={classes.EventPage}>
            <Button onClick={onBackButtonClick} className={classes.BackButton}>
                Назад
            </Button>

            <h1 className={classes.Title}>{stateName}</h1>

            {setOfInputsEvent.map((item) => {
                return (
                    <InputMapper
                        key={item.name}
                        input={item}
                        value={states[item.name].state}
                        categoriesSelectData={categoriesSelectData}
                        handler={(arg: InputEvent | string) => {
                            states[item.name].setState(
                                typeof arg !== 'string' ? (arg.currentTarget as HTMLInputElement).value : arg,
                            );
                        }}
                    />
                );
            })}

            <Button onClick={onButtonClick} className={classes.Button} disabled={!hasChanges()}>
                Сохранить
            </Button>

            {errors.length ? (
                <div className={classes.Errors}>
                    {errors.map((error) => {
                        return <p className={classes.ErrorsItem}>{error.message}</p>;
                    })}
                </div>
            ) : null}
        </div>
    );
};
