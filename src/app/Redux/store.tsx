import { ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import noteReducer from '@/app/Redux/slices/notesSlice';
import colorReducer from '@/app/Redux/slices/colorSlice';

export const store = configureStore({
    reducer: {
        notes: noteReducer,
        colors: colorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, undefined, any>;
