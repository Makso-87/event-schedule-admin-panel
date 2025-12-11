import React, { MouseEventHandler } from 'react';
import { Button } from '@mantine/core';
import classes from './TopPanel.module.scss';
import { useAuth } from '../../hooks/useAuth';
import { AUTH_TOKEN_TEXT } from '../../constants';

export const TopPanel = () => {
    const { logout } = useAuth();
    const onClickEscapeButton: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        logout();
        localStorage.removeItem(AUTH_TOKEN_TEXT);
    };

    return (
        <div className={classes.TopPanel}>
            <div className={classes.Logo}></div>
            <div className={classes.UserData}>
                <div className={classes.Avatar}></div>

                <div className={classes.Info}>
                    <div className={classes.Name}></div>
                    <div className={classes.Email}></div>
                    <div className={classes.Phone}></div>
                </div>

                <Button size='xs' className={classes.EscapeButton} onClick={onClickEscapeButton}>
                    Выйти
                </Button>
            </div>
        </div>
    );
};
