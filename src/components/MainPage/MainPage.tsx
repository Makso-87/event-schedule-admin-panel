import React from 'react';
import classes from './MainPage.module.scss';
import { LeftSideBar } from '../LeftSideBar/LeftSideBar';
import { Wrap } from '../Wrap/Wrap';

export const MainPage = () => {
    return (
        <div className={classes.Main}>
            <Wrap>
                <LeftSideBar />
            </Wrap>
        </div>
    );
};
