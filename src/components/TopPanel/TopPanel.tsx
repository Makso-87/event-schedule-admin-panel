import React, { MouseEventHandler } from 'react';
import { Button } from '@mantine/core';
import classes from './TopPanel.module.scss';
import { useAuth } from '../../hooks/useAuth';
import { AUTH_TOKEN_TEXT } from '../../constants';
import iskcon from '../../images/icons/iskcon.svg';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../hooks/useUserInitials';

export const TopPanel = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const user = useUserData();

    const onClickEscapeButton: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        logout();
        localStorage.removeItem(AUTH_TOKEN_TEXT);
    };

    return (
        <div className={classes.TopPanel}>
            <div className={classes.Logo} onClick={() => navigate('/')}>
                <img src={iskcon} alt='Логотип ИСККОН' />
            </div>

            <div className={classes.UserData}>
                <div className={classes.Avatar}>{user.initials}</div>

                <div className={classes.Info}>
                    <div className={classes.Name}>
                        {user.firstName} {user.lastName}
                    </div>

                    {user.email ? (
                        <div className={classes.Email}>{user.email}</div>
                    ) : (
                        <div className={classes.Phone}>{user.phone}</div>
                    )}
                </div>
            </div>

            <Button size='xs' className={classes.EscapeButton} onClick={onClickEscapeButton}>
                Выйти
            </Button>
        </div>
    );
};
