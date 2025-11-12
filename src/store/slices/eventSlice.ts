import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEvent, IEventState } from '../../interfaces';
import { RootState } from '../store';

const initialState: IEventState = {
    event: null,
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvent: (state, action: PayloadAction<IEvent>) => {
            state.event = action.payload;
        },
    },
});

export const { setEvent } = eventSlice.actions;

export const selectEvent = (state: RootState) => state.event.event;
export default eventSlice.reducer;
