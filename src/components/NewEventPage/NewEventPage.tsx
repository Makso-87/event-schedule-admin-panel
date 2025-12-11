import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import classes from './NewEventPage.module.scss';
import { TState } from '../../types';
import { ROUTE_EVENTS_PAGE, setOfInputsEvent } from '../../constants';
import { InputMapper } from '../InputMapper/InputMapper';
import { setCategories } from '../../store/slices/categoriesListSlice';
import { getCategories } from '../../api/getCategories';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-toolkit-hooks';
import { createEvent } from '../../api/createEvent';
import { getDateObject } from '../../utils/getDateObject';
import { getEvents } from '../../api/getEvents';
import { setEvents } from '../../store/slices/eventsListSlice';

export const NewEventPage = () => {
    const [stateName, setStateName] = useState('');
    const [stateStartDate, setStateStartDate] = useState('');
    const [stateEndDate, setStateEndDate] = useState('');
    const [stateStartTime, setStateStartTime] = useState('');
    const [stateEndTime, setStateEndTime] = useState('');
    const [statePlace, setStatePlace] = useState('');
    const [stateUrl, setStateUrl] = useState('');
    const [stateLent, setStateLent] = useState('');
    const [stateCategory, setStateCategory] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const categories = useAppSelector((state) => state.categoriesList.categories);
    const categoriesSelectData = categories.map((item) => item.name);

    const states: Record<string, TState> = {
        name: { state: stateName, setState: setStateName },
        startDate: { state: stateStartDate, setState: setStateStartDate },
        endDate: { state: stateEndDate, setState: setStateEndDate },
        startTime: { state: stateStartTime, setState: setStateStartTime },
        endTime: { state: stateEndTime, setState: setStateEndTime },
        place: { state: statePlace, setState: setStatePlace },
        url: { state: stateUrl, setState: setStateUrl },
        lent: { state: stateLent, setState: setStateLent },
        category: { state: stateCategory, setState: setStateCategory },
    };

    const onBackButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        navigate(ROUTE_EVENTS_PAGE);
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

            const { data, errors } = await createEvent({
                name: stateName,
                startDate: getDateObject(stateStartDate),
                endDate: getDateObject(stateEndDate),
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
                errors.forEach((error) => errorsList.add(error));
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
        <div className={classes.NewEventPage}>
            <Button onClick={onBackButtonClick} className={classes.BackButton}>
                Назад
            </Button>

            <h1 className={classes.Title}>Новое событие</h1>

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

            <Button onClick={onButtonClick} className={classes.Button}>
                Создать событие
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
