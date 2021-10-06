import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: 'AIzaSyDZWaOTq1z1RbaHPM-tMzubnMexLyCFHvA',
    authDomain: 'subkeeper-b64b3.firebaseapp.com',
    projectId: 'subkeeper-b64b3',
    storageBucket: 'subkeeper-b64b3.appspot.com',
    messagingSenderId: '894159441354',
    appId: '1:894159441354:web:6ef402287ca3a21f7c5333',
    measurementId: 'G-QEF0Z23DDF',
});

const initialState = {
  login: false,
  user: {}
};

export const login = createAsyncThunk('login', async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const user = await signInWithPopup(auth, provider);
    return user;
});

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => { 

    })
    .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.login = true;
    })
    .addCase(login.rejected, (state) => { 

    })
  }
});

export const { } = app.actions;

export default app.reducer;