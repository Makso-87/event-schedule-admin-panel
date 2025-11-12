import React, { MouseEventHandler } from 'react';
import classes from './CategoryPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_CATEGORIES_PAGE } from '../../constants';
import { useAppSelector } from '../../hooks/redux-toolkit-hooks';

export const CategoryPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const categories = useAppSelector((state) => state.categoriesList.categories);
    const { name, color, description } = categories.find((category) => category.id === id) || {};

    const onButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        navigate(ROUTE_CATEGORIES_PAGE);
    };

    const style = {
        width: '100px',
        height: '30px',
        background: color,
    };

    return (
        <div className={classes.CategoryPage}>
            <button onClick={onButtonClick}>Назад</button>
            <h2>{name}</h2>
            <div style={style}></div>
            <div>{description}</div>
        </div>
    );
};
