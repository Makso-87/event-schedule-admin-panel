import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { AUTH_TOKEN_TEXT } from '../constants';
import { setContext } from '@apollo/client/link/context';

// Создаем HTTP-ссылку
const httpLink = createHttpLink({
    uri: 'http://localhost:16108', // ваш GraphQL endpoint
});

// Промежуточный слой для авторизации
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN_TEXT);

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
