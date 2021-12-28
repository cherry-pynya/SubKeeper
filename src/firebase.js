import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDZWaOTq1z1RbaHPM-tMzubnMexLyCFHvA",
    authDomain: "subkeeper-b64b3.firebaseapp.com",
    projectId: "subkeeper-b64b3",
    storageBucket: "subkeeper-b64b3.appspot.com",
    messagingSenderId: "894159441354",
    appId: "1:894159441354:web:6ef402287ca3a21f7c5333",
    measurementId: "G-QEF0Z23DDF",
});

export const auth = getAuth(firebaseApp);
auth.languageCode = 'ru';

export default firebaseApp;