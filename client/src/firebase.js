// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-rawafid.firebaseapp.com",
  projectId: "mern-rawafid",
  storageBucket: "mern-rawafid.appspot.com",
  messagingSenderId: "479470506832",
  appId: "1:479470506832:web:1fcfad7a792c76614e5255"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
