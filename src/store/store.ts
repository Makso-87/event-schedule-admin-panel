import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesListSlice';
import eventsReducer from './slices/eventsListSlice';
import categoryReducer from './slices/categorySlice';
import userReducer from './slices/userSlice';
import eventReducer from './slices/eventSlice';

export const store = configureStore({
    reducer: {
        eventsList: eventsReducer,
        categoriesList: categoriesReducer,
        category: categoryReducer,
        user: userReducer,
        event: eventReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
