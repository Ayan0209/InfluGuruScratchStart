// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAImBTKQEC3D8HA8V9CGnQA0WmcmExJfqk",
  authDomain: "influ-38557.firebaseapp.com",
  projectId: "influ-38557",
  storageBucket: "influ-38557.appspot.com",
  messagingSenderId: "990117039018",
  appId: "1:990117039018:web:4df2d5f71a8b5dd15979d3",
  measurementId: "G-92WSZFR8L4"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const analytics = getAnalytics(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP);