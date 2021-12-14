import { configureStore } from '@reduxjs/toolkit';
import app from '../slices/app';
import form from '../slices/form';

export const store = configureStore({
  reducer: {
    app: app,
    form: form,
  },
})