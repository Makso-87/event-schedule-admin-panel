import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from '../../interfaces';
import { RootState } from '../store';
import { EResponseStatus } from '../../enums';

const initialState: IUserState = {
    user: null,
    status: EResponseStatus.Default,
    errors: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserState>) => {
            state.user = action.payload.user;
            state.status = action.payload.status;
            state.errors = action.payload.errors;
        },
    },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.category.category;
export default userSlice.reducer;
