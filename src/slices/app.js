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
import { getFirestore, collection, addDoc, setDoc, getDoc, doc, updateDoc } from "firebase/firestore"
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
  user: {
    accessToken: '',
    id: '',
    email: '',
    accessToken: '',
  },
  statistics: [],
  data: [],
};

const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore();

export const getDataFromDB = createAsyncThunk('getDataFromDB', async () =>{
  const docRef = doc(db, 'state', 'CA');
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return [];
  }
});

export const initUserInDB = createAsyncThunk('initUserInDB', async (id) =>{
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    await setDoc(docRef, {data: []});
    return [];
  }
});

export const putDataToDB = createAsyncThunk('putDataToDB', async (id, data) => {
  try {
    await setDoc(doc(db, 'users', id), {
      data: data
    });
  } catch(e) {
    console.error(e);
  }
});

export const addItemToDB = createAsyncThunk('addItemToDB', async (id, data) => {
  try {
    const docRef = doc(db, 'users', id);
    await updateDoc(docRef, {
      data: data,
    });
  } catch(e) {
    console.error(e);
  }
});

export const login = createAsyncThunk("login", async () => {
  /** 
  await setPersistence(auth, browserSessionPersistence);
  const user = await signInWithPopup(auth, provider);
  */
  const user = await setPersistence(auth, browserSessionPersistence).then(()=> {
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
    setStatusFullfiled: (state) => {
      state.status = process.env.REACT_APP_FULLFILED;
    },
    addItemToData: (state, action) => {
      state.data.push(action.payload);
    },
    setData: (state, action) => {
      state.data = action.payload.data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = process.env.REACT_APP_PENDING;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user } = action.payload;
        const { displayName } = user.providerData[0];
        const { email, uid } = user;
        state.user.email = email;
        state.user.id = uid;
        state.user.name = displayName;
        state.login = true;
        state.status = process.env.REACT_APP_FULLFILED;
      })
      .addCase(login.rejected, (state) => {
        state.status = process.env.REACT_APP_REJECTED;
      })
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
      .addCase(putDataToDB.pending, (state) => {
      })
      .addCase(putDataToDB.fulfilled, (state, action) => {
        console.log('worked')
      })
      .addCase(putDataToDB.rejected, (state) => {

      })
      .addCase(initUserInDB.pending, (state) => {
      })
      .addCase(initUserInDB.fulfilled, (state, action) => {
        state.data = action.payload.data;
        const stats = new Statistics(state.data, state.currency);
        state.statistics = stats.init();
        console.log('Initial user data fetched from db!')
      })
      .addCase(initUserInDB.rejected, (state) => {

      })
      .addCase(addItemToDB.pending, (state) => {
      })
      .addCase(addItemToDB.fulfilled, (state) => {
        const stats = new Statistics(state.data, state.currency);
        state.statistics = stats.init();
        console.log('Item added to db!');
      })
      .addCase(addItemToDB.rejected, (state) => {

      })
      .addCase(getDataFromDB.pending, (state) => {
        state.status = process.env.REACT_APP_PENDING;
      })
      .addCase(getDataFromDB.fulfilled, (state, action) => {
        state.mockData = action.payload;
        console.log('Data fetched from db!');
        state.status = process.env.REACT_APP_FULLFILED;
      })
      .addCase(getDataFromDB.rejected, (state) => {
        console.log('data not find in db!')
        state.status = process.env.REACT_APP_REJECTED;
      })
  },
});

export const { setStatistics, setStatusFullfiled, addItemToData, setData } = app.actions;

export default app.reducer;
