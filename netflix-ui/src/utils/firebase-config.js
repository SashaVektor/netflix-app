
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCn8PJgs2Qr1kaGkRv8-hhfKoY7ozSgQp4",
  authDomain: "react-netflix-7d5d4.firebaseapp.com",
  projectId: "react-netflix-7d5d4",
  storageBucket: "react-netflix-7d5d4.appspot.com",
  messagingSenderId: "568748703972",
  appId: "1:568748703972:web:9cdcbad39f97203765acf1",
  measurementId: "G-8V4HNQZELR"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
