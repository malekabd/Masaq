// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "masaqproject-74aaa.firebaseapp.com",
  projectId: "masaqproject-74aaa",
  storageBucket: "masaqproject-74aaa.appspot.com",
  messagingSenderId: "738113426554",
  appId: "1:738113426554:web:12ccce69ea90d0a80817c3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
