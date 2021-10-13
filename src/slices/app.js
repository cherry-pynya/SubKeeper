import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInWithCredential } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { nanoid } from "@reduxjs/toolkit";

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
  user: {},
  mockData: [{
    id: nanoid(), 
    name: 'kinopoisk',
    cost: 169,
    currency: 'RUB',
    option: 1,
    date: '11.10.2019',
    letter: 'k'
  },
  {
    id: nanoid(), 
    name: 'ivy',
    cost: 500,
    currency: 'RUB',
    option: 3,
    date: '05.05.2020',
    letter: 'i'
  },
  {
    id: nanoid(), 
    name: 'psn',
    cost: 2500,
    currency: 'RUB',
    option: 6,
    date: '01.01.2021',
    letter: 'p'
  },
  {
    id: nanoid(), 
    name: 'spotify',
    cost: 1000,
    currency: 'RUB',
    option: 12,
    date: '01.01.2017',
    letter: 's'
  }]
};

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const login = createAsyncThunk('login', async () => {
    const user = await signInWithPopup(auth, provider);
    return user;
});

export const loginWithCredentials = createAsyncThunk('loginWithCredentials', async () => {
    const { uid } = JSON.stringify(window.localStorage.getItem('userData'));
    const user = await auth.signInWithCredential(uid);
    return user;
});

export const logout = createAsyncThunk('logout', async () => {
    const out = await auth.signOut();
    console.log(out)
});

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleLogin: (state) => {
        state.login = !state.login;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => { 

    })
    .addCase(login.fulfilled, (state, action) => {
        const { user } = action.payload;
        const { accessToken, email, uid } = user;
        state.user.accessToken = accessToken;
        state.user.email = email;
        state.user.uid = uid;
        state.login = true;
        window.localStorage.setItem('userData', JSON.stringify({uid, email}));
    })
    .addCase(login.rejected, (state) => { 

    })
    .addCase(logout.pending, (state) => { 

    })
    .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.login = false;
    })
    .addCase(logout.rejected, (state) => { 

    })
    .addCase(loginWithCredentials.pending, (state) => { 

    })
    .addCase(loginWithCredentials.fulfilled, (state, action) => {
        const { user } = action.payload;
        const { accessToken, email, uid } = user;
        state.user.accessToken = accessToken;
        state.user.email = email;
        state.user.uid = uid;
        state.login = true;
        window.localStorage.setItem('userData', JSON.stringify({uid, email}));
    })
    .addCase(loginWithCredentials.rejected, (state) => { 

    })
  }
});

export const { toggleLogin } = app.actions;

export default app.reducer;