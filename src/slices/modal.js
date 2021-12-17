import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
};

export const modal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleActive: (state) => {
            state.active = !state.active;
        }
    }
});

export const { toggleActive } = modal.actions;

export default modal.reducer;