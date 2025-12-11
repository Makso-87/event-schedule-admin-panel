import React, { FC, useEffect } from 'react';
import { TProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';

export const AuthProvider: FC<TProps> = ({ children }) => {
    const { checkTokenAndFetchUser } = useAuth();

    useEffect(() => {
        (async () => {
            await checkTokenAndFetchUser();
        })();
    }, []);

    return <>{children}</>;
};
