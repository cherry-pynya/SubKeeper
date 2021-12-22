import { createSlice } from "@reduxjs/toolkit";

//отвечает за состояние модального окна
const initialState = {
    active: false,
    id: null,
    name: '',
};

export const modal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action) => {
            const { name , id } = action.payload;
            state.active = true;
            state.id = id;
            state.name = name;
        },
        resetModal: (state) => {
            state.active = false;
            state.id = null;
        }
    }
});

export const { toggleActive, setModal, resetModal } = modal.actions;

export default modal.reducer;