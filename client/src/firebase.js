import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mern-redux-real-estate.firebaseapp.com",
  projectId: "mern-redux-real-estate",
  storageBucket: "mern-redux-real-estate.appspot.com",
  messagingSenderId: "446710068727",
  appId: "1:446710068727:web:b9a4c90bc9a076a378aaf2",
};

export const app = initializeApp(firebaseConfig);
