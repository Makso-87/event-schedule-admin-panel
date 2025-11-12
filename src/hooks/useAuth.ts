import { useLocation, useNavigate } from 'react-router-dom';
import { getPathFrom } from '../utils/getPathFrom';
import { getUser } from '../api/getUser';
import { getAuthToken } from '../api/getAuthToken';
import { ILoginData, ILoginResponseData } from '../interfaces';
import { AUTH_TOKEN_TEXT } from '../constants';
import { useAppDispatch, useAppSelector } from './redux-toolkit-hooks';
import { setUser } from '../store/slices/userSlice';
import { EResponseStatus } from '../enums';
import { client } from '../apollo/client';

export const useAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = getPathFrom(location);
    const currentUser = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const fetchUser = async () => {
        dispatch(setUser({ user: null, errors: [], status: EResponseStatus.Loading }));
        const { user, errors } = await getUser();

        if (user) {
            dispatch(setUser({ user, errors, status: EResponseStatus.Success }));
        } else {
            dispatch(setUser({ user, errors, status: EResponseStatus.Error }));
        }
    };

    const checkTokenAndFetchUser = async () => {
        const token = localStorage.getItem(AUTH_TOKEN_TEXT);

        if (token && !currentUser) {
            await fetchUser();
            navigate(from, { replace: true });
        }
    };

    const login = async (loginData: ILoginData): Promise<ILoginResponseData> => {
        const { token, errors } = await getAuthToken(loginData);

        if (token) {
            localStorage.setItem(AUTH_TOKEN_TEXT, token);
            await fetchUser();

            return {
                status: EResponseStatus.Success,
            };
        }

        return {
            status: EResponseStatus.Error,
            errors,
        };
    };

    const logout = () => {
        setUser({ user: null, errors: [], status: EResponseStatus.Default });
        localStorage.removeItem(AUTH_TOKEN_TEXT);
        client.resetStore();
        navigate('login', { replace: true });
    };

    return {
        login,
        logout,
        checkTokenAndFetchUser,
    };
};
