import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    cost: "",
    currency: "RUB",
    option: "1",
    date: new Date(),
}

export const form = createSlice({
    name: 'form',
    initialState,
    reducers: {
        resetForm: (state) => {
            state = initialState;
        },
        editingForm: (state, action) => {
            const {name, cost, currency, option, date} = action.payload;
            state.cost = cost;
            state.name = name;
            state.currency = currency;
            state.naoptionme = option;
            state.date = new Date(date);
        }
    }
});

export const { editingForm, resetForm } = form.actions;

export default form.reducer;