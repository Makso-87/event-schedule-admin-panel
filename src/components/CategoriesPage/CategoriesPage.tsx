import React, { useEffect } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import classes from './CategoriesPage.module.scss';
import { Wrap } from '../Wrap/Wrap';
import { LeftSideBar } from '../LeftSideBar/LeftSideBar';
import { CategoriesList } from '../CategoriesList/CategoriesList';
import { ROUTE_CATEGORIES_PAGE, ROUTE_CATEGORY_PAGE } from '../../constants';
import { getCategories } from '../../api/getCategories';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-toolkit-hooks';
import { setCategories } from '../../store/slices/categoriesListSlice';

export const CategoriesPage = () => {
    const categories = useAppSelector((state) => state.categoriesList.categories);
    const dispatch = useAppDispatch();
    const categoryId = useMatch(`${ROUTE_CATEGORIES_PAGE}/${ROUTE_CATEGORY_PAGE}`);

    useEffect(() => {
        (async () => {
            const categoriesList = await getCategories();
            dispatch(setCategories(categoriesList));
        })();
    }, []);

    return (
        <div className={classes.CategoriesPage}>
            <Wrap>
                <div className={classes.LeftSide}>
                    <LeftSideBar />
                </div>

                <div className={classes.RightSide}>
                    {categoryId ? <Outlet /> : <CategoriesList categories={categories} />}
                </div>
            </Wrap>
        </div>
    );
};
