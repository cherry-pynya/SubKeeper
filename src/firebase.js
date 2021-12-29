import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: "subkeeper-b64b3.firebaseapp.com",
    projectId: "subkeeper-b64b3",
    storageBucket: "subkeeper-b64b3.appspot.com",
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
});

const auth = getAuth(firebaseApp);
auth.languageCode = 'ru';
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const db = getFirestore(firebaseApp);

export default firebaseApp;
export {auth, provider, db};