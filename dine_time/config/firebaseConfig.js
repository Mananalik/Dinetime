// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQWNugEKEagEXkNnBcuV6zeSxwzzkMp64",
  authDomain: "dine-time-mm.firebaseapp.com",
  projectId: "dine-time-mm",
  storageBucket: "dine-time-mm.firebasestorage.app",
  messagingSenderId: "869431776659",
  appId: "1:869431776659:web:b9a10b6d43813847308466",
  measurementId: "G-Z0F78THRFL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);