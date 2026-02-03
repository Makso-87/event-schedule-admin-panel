import { useAppSelector } from './redux-toolkit-hooks';
const getFirstChar = (string: string) => {
    if (!string.length) {
        return '';
    }

    return string.charAt(0).toUpperCase();
};

export const useUserData = () => {
    const user = useAppSelector((state) => state.user.user);
    const initials = `${getFirstChar(user.firstName)}${getFirstChar(user.lastName)}`;

    return {
        ...user,
        initials,
    };
};
