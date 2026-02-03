import React from 'react';
import classes from './MainPage.module.scss';
import { LeftSideBar } from '../LeftSideBar/LeftSideBar';
import { Wrap } from '../Wrap/Wrap';
import { MAIN_TITLE } from '../../constants';

export const MainPage = () => {
    return (
        <div className={classes.MainPage}>
            <Wrap>
                <LeftSideBar />

                <div className={classes.RightSide}>
                    <h1 className={classes.Title}>{MAIN_TITLE}</h1>
                </div>
            </Wrap>
        </div>
    );
};
