import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    cost: "",
    currency: "RUB",
    option: "1",
    date: new Date().toString(),
    newItem: true,
}

export const form = createSlice({
    name: 'form',
    initialState,
    reducers: {
        resetForm: (state) => {
            state = initialState;
        },
        editingForm: (state, action) => {
            state = action.payload;
        }
    }
});

export const { editingForm, resetForm } = form.actions;

export default form.reducer;