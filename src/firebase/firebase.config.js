// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6tf54NsuOmuB9taBYGzbgM-lwlahBI3U",
    authDomain: "a12-client-side.firebaseapp.com",
    projectId: "a12-client-side",
    storageBucket: "a12-client-side.appspot.com",
    messagingSenderId: "58052031982",
    appId: "1:58052031982:web:5643cbe6b8b3921275caff",
    measurementId: "G-Z290JPE7KB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
