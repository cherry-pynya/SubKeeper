import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    cost: 0,
    currency: "RUB",
    option: "1",
    date: new Date().toString(),
    newItem: true,
    id: null,
}

export const form = createSlice({
    name: 'form',
    initialState,
    reducers: {
        resetForm: (state) => {
            state.newItem = true;
            state.name = "";
            state.cost = 0;
            state.currency = "RUB";
            state.option = "1";
            state.date = new Date().toString();
            state.id = null;
        },
        editingForm: (state, action) => {
            const {name, cost, currency, option, date, id } = action.payload;
            state.newItem = false;
            state.name = name;
            state.cost = cost;
            state.currency = currency;
            state.option = option;
            state.date = date;
            state.id = id;
        }
    }
});

export const { editingForm, resetForm } = form.actions;

export default form.reducer;