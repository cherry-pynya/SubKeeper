import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithPopup,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { 
  setDoc, 
  doc, 
  collection, 
  query, 
  where, 
  getDocs,
  deleteDoc  } from "firebase/firestore"
import extractCurrency from "../components/utils/extractCurrency";
import Statistics from "../components/utils/Statistics";
import { auth, provider, db } from "../firebase";

const initialState = {
  status: process.env.REACT_APP_FULLFILED,
  login: false,
  currency: [],
  user: {
    id: '',
  },
  statistics: [],
  data: [],
};

//проверяет есть ли в базе подписки по id пользователя firebase
async function getDataFromDB(id) {
  const q = query(collection(db, "subs"), where("user", "==", id));
  const querySnapshot = await getDocs(q);
  const arr = [];
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });
  return arr;
};

//удалить подписку их базы
export const deleteFromDB = createAsyncThunk('deleteFromDB', async (object) => {
  const { id, userID } = object;
  const docRef = doc(db, 'subs', id);
  await deleteDoc(docRef);
  const subs = await getDataFromDB(userID);
  return subs;
});

//добавляет подписку в базу
export const addItemToDB = createAsyncThunk('addItemToDB', async (object) => {
  const { item, userID } = object;
  const { id } = item;
  const docRef = doc(db, 'subs', id);
  await setDoc(docRef, item);
  const subs = await getDataFromDB(userID);
  return subs;
});

//редактируем подписку в базе
export const editItemInDB = createAsyncThunk('editItemInDB', async (object) => {
  const { data, userID } = object;
  const { id } = data;
  delete data.newItem;
  const docRef = doc(db, 'subs', id);
  await setDoc(docRef, data, {merge: true});
  const subs = await getDataFromDB(userID);
  return subs;
});

//логинимся и получаем данные из базы
export const login = createAsyncThunk("login", async (id = null) => {
  let uid;
  if (!id) {
    const userData = await setPersistence(auth, browserSessionPersistence).then(() => {
      return signInWithPopup(auth, provider);
    });
    const { user } = userData;
    uid = user.uid;
  } else {
    uid = id.uid;
  }
  const subs = await getDataFromDB(uid);
  return {uid, subs};
});

//разлогиниваемся
export const logout = createAsyncThunk("logout", async () => {
  await signOut(auth);
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
    },
    setStats: (state, action) => {
      state.statistics = action.payload;
    },
    updateStats: (state) => {
      const stats = new Statistics(state.data, state.currency);
      state.statistics = stats.init();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = process.env.REACT_APP_PENDING;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { uid, subs } = action.payload;
        state.user.id = uid;
        state.login = true;
        state.data = subs;
        const stats = new Statistics(state.data, state.currency);
        state.statistics = stats.init();
        state.status = process.env.REACT_APP_FULLFILED;
      })
      .addCase(login.rejected, (state) => {
        state.status = process.env.REACT_APP_REJECTED;
      })
      .addCase(logout.pending, (state) => {
        state.status = process.env.REACT_APP_PENDING;
      })
      .addCase(logout.fulfilled, (state) => {
        state.login = false;
        state.user = {
          id: '',
        };
        state.status = process.env.REACT_APP_FULLFILED;
      })
      .addCase(logout.rejected, (state) => {
        state.status = process.env.REACT_APP_REJECTED;
      })
      .addCase(getCurrency.pending, (state) => {
      })
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.currency = action.payload;
      })
      .addCase(getCurrency.rejected, (state) => {
      })
      .addCase(addItemToDB.pending, (state) => {
        state.status = process.env.REACT_APP_PENDING;
      })
      .addCase(addItemToDB.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statistics = new Statistics(action.payload, state.currency).init();
        state.status = process.env.REACT_APP_FULLFILED;
        console.log('Item added to DB!');
      })
      .addCase(addItemToDB.rejected, (state) => {
        state.status = process.env.REACT_APP_REJECTED;
      })
      .addCase(deleteFromDB.pending, (state) => {
        state.status = process.env.REACT_APP_PENDING;
      })
      .addCase(deleteFromDB.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statistics = new Statistics(action.payload, state.currency).init();
        console.log('Item deleted from DB!');
        state.status = process.env.REACT_APP_FULLFILED;
      })
      .addCase(deleteFromDB.rejected, (state) => {
        state.status = process.env.REACT_APP_REJECTED;
      })
      .addCase(editItemInDB.pending, (state) => {
        state.status = process.env.REACT_APP_PENDING;
      })
      .addCase(editItemInDB.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statistics = new Statistics(action.payload, state.currency).init();
        state.status = process.env.REACT_APP_FULLFILED;
        console.log('Item edited in DB!');
      })
      .addCase(editItemInDB.rejected, (state) => {
        state.status = process.env.REACT_APP_REJECTED;
      })
  },
});

export const { setStatistics, setStatusFullfiled, addItemToData, setData, setStats, updateStats } = app.actions;

export default app.reducer;
