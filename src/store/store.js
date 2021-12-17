import { configureStore } from '@reduxjs/toolkit';
import app from '../slices/app';
import form from '../slices/form';
import modal from '../slices/modal';

export const store = configureStore({
  reducer: {
    app: app,
    form: form,
    modal: modal,
  },
})