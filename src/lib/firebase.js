import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqBRT6nkbyb24tV5zwHUyUh0j0o",
  authDomain: "plataforma-frete.firebaseapp.com",
  projectId: "plataforma-frete",
  storageBucket: "plataforma-frete.appspot.com",
  messagingSenderId: "910159543778",
  appId: "1:910159543778:web:cb2d49015e97a15b8ddbb",
  measurementId: "G-RGH3T5TPX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
