import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, ICategoryState } from '../../interfaces';
import { RootState } from '../store';

const initialState: ICategoryState = {
    category: null,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<ICategory>) => {
            state.category = action.payload;
        },
    },
});

export const { setCategory } = categorySlice.actions;

export const selectCategory = (state: RootState) => state.category.category;
export default categorySlice.reducer;
