import React from 'react';
import { Outlet } from 'react-router-dom';
import classes from './Layout.module.scss';
import { TopPanel } from '../TopPanel/TopPanel';

export const Layout = () => {
    return (
        <div className={classes.Layout}>
            <TopPanel />

            <div className={classes.Content}>
                <Outlet />
            </div>
        </div>
    );
};
