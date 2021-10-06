import { configureStore } from '@reduxjs/toolkit';
import app from '../slices/app';

export const store = configureStore({
  reducer: {
    app: app,
  },
})