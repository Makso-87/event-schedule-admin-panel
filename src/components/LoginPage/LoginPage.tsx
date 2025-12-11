import React, { FormEventHandler, MouseEventHandler, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './LoginPage.module.scss';
import { useAuth } from '../../hooks/useAuth';
import { getPathFrom } from '../../utils/getPathFrom';
import { EResponseStatus } from '../../enums';
import { Button, Input, Loader } from '@mantine/core';

export const LoginPage = () => {
    const [errorsList, setErrorsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = getPathFrom(location);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onAuthCLick: MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { status, errors } = await login({ email, password });

        if (status === EResponseStatus.Success) {
            navigate(from, { replace: true });
        } else {
            setErrorsList(errors);
        }

        setTimeout(() => {
            setLoading(false);
        });
    };

    const inputEmailOrPhone: FormEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        const { value } = event.target as HTMLInputElement;
        setEmail(value);
    };

    const inputPassword: FormEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        const { value } = event.target as HTMLInputElement;
        setPassword(value);
    };

    return (
        <div className={classes.LoginPage}>
            <form className={classes.Form}>
                <h2 className={classes.Title}>Авторизация</h2>

                <Input
                    className={classes.Input}
                    name='email'
                    type='text'
                    onInput={inputEmailOrPhone}
                    placeholder='Email'
                    disabled={loading}
                />

                <Input
                    className={classes.Input}
                    name='password'
                    type='text'
                    onInput={inputPassword}
                    placeholder='Пароль'
                    disabled={loading}
                />

                {errorsList.length ? (
                    <div className={classes.ErrorsContainer}>
                        {errorsList.map((error) => {
                            return <div className={classes.ErrorMessage}>{error.message}</div>;
                        })}
                    </div>
                ) : null}

                <Button className={classes.Button} onClick={onAuthCLick} disabled={loading}>
                    {loading ? <Loader size={20} /> : 'Войти'}
                </Button>
            </form>
        </div>
    );
};
