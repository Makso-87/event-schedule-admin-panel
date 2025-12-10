import React, { MouseEventHandler, useState } from 'react';
import classes from './CategoryPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mantine/core';
import { ROUTE_CATEGORIES_PAGE, setOfInputsEventsCategory } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-toolkit-hooks';
import { hasDifferenceShallow } from '../../utils/hasDifference';
import { TState } from '../../types';
import { InputMapper } from '../InputMapper/InputMapper';
import { updateCategory } from '../../api/updateCategory';
import { getCategories } from '../../api/getCategories';
import { setCategories } from '../../store/slices/categoriesListSlice';

export const CategoryPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const categories = useAppSelector((state) => state.categoriesList.categories);
    const { name, description, color } = categories.find((category) => category.id === id) || {};

    const onBackButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        navigate(ROUTE_CATEGORIES_PAGE);
    };

    const [stateName, setStateName] = useState(name ?? null);
    const [stateDescription, setStateDescription] = useState(description ?? null);
    const [stateColor, setStateColor] = useState(color ?? null);
    const [errors, setErrors] = useState([]);

    const hasChanges = () => {
        const oldData = {
            name,
            description,
            color,
        };

        const newData = {
            name: stateName,
            description: stateDescription,
            color: stateColor,
        };

        return hasDifferenceShallow(oldData, newData);
    };

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
                message: 'Необходимо указать цвет категории',
            });
        }

        if (stateName && stateColor) {
            const { data, errors } = await updateCategory({
                id,
                name: stateName,
                description: stateDescription,
                color: stateColor,
            });

            if (data) {
                const { categories } = await getCategories();
                dispatch(setCategories(categories));
                navigate(ROUTE_CATEGORIES_PAGE);
            } else {
                errors.forEach((error: Error) => errorsList.add(error));
            }
        }

        setErrors([...Array.from(errorsList)]);
    };

    return (
        <div className={classes.CategoryPage}>
            <Button onClick={onBackButtonClick} className={classes.BackButton}>
                Назад
            </Button>

            <h1 className={classes.Title}>{stateName}</h1>

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

            <Button onClick={onButtonClick} className={classes.Button} disabled={!hasChanges()}>
                Сохранить
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
