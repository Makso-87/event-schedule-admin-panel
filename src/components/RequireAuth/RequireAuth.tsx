import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { TProps } from '../../types';
import { ROUTE_LOGIN } from '../../constants';
import { useAppSelector } from '../../hooks/redux-toolkit-hooks';

export const RequireAuth: FC<TProps> = ({ children }) => {
    const user = useAppSelector((state) => state.user.user);
    const location = useLocation();

    if (!user) {
        // Перенаправляем на /getAuthToken, сохраняя текущий путь для редиректа после входа
        return <Navigate to={ROUTE_LOGIN} state={{ from: location }} replace />;
    }

    return children;
};
