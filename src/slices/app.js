import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithCredential,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { nanoid } from "@reduxjs/toolkit";
import extractCurrency from "../components/utils/extractCurrency";
import Statistics from "../components/utils/Statistics";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDZWaOTq1z1RbaHPM-tMzubnMexLyCFHvA",
  authDomain: "subkeeper-b64b3.firebaseapp.com",
  projectId: "subkeeper-b64b3",
  storageBucket: "subkeeper-b64b3.appspot.com",
  messagingSenderId: "894159441354",
  appId: "1:894159441354:web:6ef402287ca3a21f7c5333",
  measurementId: "G-QEF0Z23DDF",
});



const initialState = {
  status: process.env.REACT_APP_FULLFILED,
  login: false,
  currency: [],
  user: {},
  statistics: [],
  mockData: [
    {
      id: nanoid(),
      name: "kinopoisk",
      cost: 169,
      currency: "RUB",
      option: 1,
      date: "20191011",
      letter: "k",
      active: true,
      canceled: null,
    },
    {
      id: nanoid(),
      name: "ivy",
      cost: 500,
      currency: "RUB",
      option: 3,
      date: "20200505",
      letter: "i",
      active: true,
      canceled: null,
    },
    {
      id: nanoid(),
      name: "psn",
      cost: 2500,
      currency: "RUB",
      option: 6,
      date: "20210101",
      letter: "p",
      active: false,
      canceled: '20120613',
    },
    {
      id: nanoid(),
      name: "photoshop",
      cost: 100,
      currency: "USD",
      option: 12,
      date: "20210101",
      letter: "p",
      active: false,
      canceled: '20120613',
    },
    {
      id: nanoid(),
      name: "spotify",
      cost: 1000,
      currency: "RUB",
      option: 12,
      date: "20170101",
      letter: "s",
      active: true,
      canceled: null,
    },
  ],
};

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const login = createAsyncThunk("login", async () => {
  /** 
  await setPersistence(auth, browserSessionPersistence);
  const user = await signInWithPopup(auth, provider);
  */
  const user = await setPersistence(auth, browserSessionPersistence).then(()=> {
    console.log('persistance')
    return signInWithPopup(auth, provider);
  });
  return user;
});

export const logout = createAsyncThunk("logout", async () => {
  signOut(auth).then(()=> {
    console.log('User signed out');
  }).catch((error) => {
    console.error(error);
  })
});

export const getCurrency = createAsyncThunk("getCurrency", async () => {
  const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js", {
    "Content-Type": "application/xml",
    "Access-Control-Allow-Origin": "*",
  });
  const data = await response.json();
  const cur = await extractCurrency(data);
  return cur;
});

export const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStatistics: (state, action) => {
      state.statistics = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = process.env.REACT_APP_PENDING;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user } = action.payload;
        const { accessToken, email, uid } = user;
        state.user.accessToken = accessToken;
        state.user.email = email;
        state.user.uid = uid;
        state.login = true;
        const stats = new Statistics(state.mockData, state.currency);
        state.statistics = stats.init();
        window.localStorage.setItem("userData", JSON.stringify({ uid, email }));
        state.status = process.env.REACT_APP_FULLFILED;
      })
      .addCase(login.rejected, (state) => {})
      .addCase(logout.pending, (state) => {})
      .addCase(logout.fulfilled, (state) => {
        state.mockData = [];
        state.login = false;
        state.user = {};
        state.statistics = [];

      })
      .addCase(logout.rejected, (state) => {})
      .addCase(getCurrency.pending, (state) => {
      })
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.currency = action.payload;
      })
      .addCase(getCurrency.rejected, (state) => {
      })
  },
});

export const { setStatistics } = app.actions;

export default app.reducer;
