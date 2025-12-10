import React, { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import classes from './NewCategoryPage.module.scss';
import { useAppDispatch } from '../../hooks/redux-toolkit-hooks';
import { TState } from '../../types';
import { ROUTE_CATEGORIES_PAGE, setOfInputsEventsCategory } from '../../constants';
import { InputMapper } from '../InputMapper/InputMapper';
import { createCategory } from '../../api/createCategory';
import { getCategories } from '../../api/getCategories';
import { setCategories } from '../../store/slices/categoriesListSlice';

export const NewCategoryPage = () => {
    const [stateName, setStateName] = useState('');
    const [stateDescription, setStateDescription] = useState('');
    const [stateColor, setStateColor] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const states: Record<string, TState> = {
        name: { state: stateName, setState: setStateName },
        description: { state: stateDescription, setState: setStateDescription },
        color: { state: stateColor, setState: setStateColor },
    };

    const onButtonClick: MouseEventHandler = async (event) => {
        event.preventDefault();

        const errorsList = new Set();

        if (!stateName) {
            errorsList.add({
                message: 'Необходимо ввести название категории',
            });
        }

        if (!stateColor) {
            errorsList.add({
                message: 'Необходимо указать категории',
            });
        }

        if (stateName && stateColor) {
            const { data, errors } = await createCategory({
                name: stateName,
                description: stateDescription,
                color: stateColor,
            });

            if (data) {
                const { categories } = await getCategories();
                dispatch(setCategories(categories));
                navigate(ROUTE_CATEGORIES_PAGE);
            } else {
                errors.forEach((error) => errorsList.add(error));
            }
        }

        setErrors([...Array.from(errorsList)]);
    };

    return (
        <div className={classes.NewEventPage}>
            <h1 className={classes.Title}>Новое событие</h1>

            {setOfInputsEventsCategory.map((item) => {
                return (
                    <InputMapper
                        key={item.name}
                        input={item}
                        value={states[item.name].state}
                        handler={(arg: InputEvent | string) => {
                            states[item.name].setState(
                                typeof arg !== 'string' ? (arg.currentTarget as HTMLInputElement).value : arg,
                            );
                        }}
                    />
                );
            })}

            <Button onClick={onButtonClick} className={classes.Button}>
                Создать категорию
            </Button>

            {errors.length ? (
                <div className={classes.Errors}>
                    {errors.map((error) => {
                        return (
                            <p key={error.message} className={classes.ErrorsItem}>
                                {error.message}
                            </p>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};
