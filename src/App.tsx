import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@mantine/core/styles.css';
import './styles.css';

import { client } from './apollo/client';
import { LoginPage } from './components/LoginPage/LoginPage';
import { AuthProvider } from './components/AuthProvider/AuthProvider';
import {
    ROUTE_CATEGORIES_PAGE,
    ROUTE_CATEGORY_PAGE,
    ROUTE_EVENT_PAGE,
    ROUTE_EVENTS_PAGE,
    ROUTE_LOGIN,
    ROUTE_NEW_CATEGORY_PAGE,
    ROUTE_NEW_EVENT_PAGE,
} from './constants';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { Layout } from './components/Layout/Layout';
import { NewEventPage } from './components/NewEventPage/NewEventPage';
import { CategoryPage } from './components/CategoryPage/CategoryPage';
import { NewCategoryPage } from './components/NewCategoryPage/NewCategoryPage';
import { EventPage } from './components/EventPage/EventPage';
import { EventsPage } from './components/EventsPage/EventsPage';
import { CategoriesPage } from './components/CategoriesPage/CategoriesPage';
import { createTheme, MantineProvider } from '@mantine/core';
import { MainPage } from './components/MainPage/MainPage';

const theme = createTheme({});

export const App = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <MantineProvider theme={theme}>
                    <AuthProvider>
                        <Routes>
                            {/* Публичные маршруты */}
                            <Route path={ROUTE_LOGIN} element={<LoginPage />} />

                            {/* Защищенные маршруты */}
                            <Route
                                path='/'
                                element={
                                    <RequireAuth>
                                        <Layout />
                                    </RequireAuth>
                                }
                            >
                                <Route index element={<MainPage />} />

                                <Route path={ROUTE_EVENTS_PAGE} element={<EventsPage />}>
                                    <Route path={ROUTE_EVENT_PAGE} element={<EventPage />} />
                                    <Route path={ROUTE_NEW_EVENT_PAGE} element={<NewEventPage />} />
                                </Route>

                                <Route path={ROUTE_CATEGORIES_PAGE} element={<CategoriesPage />}>
                                    <Route path={ROUTE_CATEGORY_PAGE} element={<CategoryPage />} />
                                    <Route path={ROUTE_NEW_CATEGORY_PAGE} element={<NewCategoryPage />} />
                                </Route>
                            </Route>
                        </Routes>
                    </AuthProvider>
                </MantineProvider>
            </BrowserRouter>
        </ApolloProvider>
    );
};
