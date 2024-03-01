import { Color } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type ColorsState = {
    colors: Color[];
};

const initialState: ColorsState = {
    colors: [],
};

export const getColors = createAsyncThunk('color/getColors', async () => {
    try {
        const response = await fetch('/api/colors');
        if (!response.ok) {
            throw new Error('Failed to fetch colors');
        }
        return response.json();
    } catch (error) {
        console.log('🚀 ~ getColors ~ error:', error);
    }
});
export const createColor = createAsyncThunk(
    'color/createColor',
    async (hexValue: string) => {
        try {
            const response = await fetch('/api/colors', {
                method: 'POST',
                body: JSON.stringify({ hex: hexValue }),
            });
            if (!response.ok) {
                throw new Error('Failed to create color');
            }
            return response.json();
        } catch (error) {
            console.log('🚀 ~ createColor ~ error:', error);
        }
    }
);

const colorsSlice = createSlice({
    name: 'colors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get colors
        builder.addCase(getColors.fulfilled, (state, action) => {
            state.colors = action.payload.colors;
        });
        // create color
        builder.addCase(createColor.fulfilled, (state, action) => {
            console.log('🚀 ~ builder.addCase ~ action:', action);
            state.colors.push(action.payload.createdColor);
        });
    },
});

export default colorsSlice.reducer;
