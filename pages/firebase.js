// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXDuvVUnF_L3SJj8UQkl2H7qJeIzVNy0M",
  authDomain: "expensetracker-e44aa.firebaseapp.com",
  projectId: "expensetracker-e44aa",
  storageBucket: "expensetracker-e44aa.appspot.com",
  messagingSenderId: "882495196340",
  appId: "1:882495196340:web:e467ecf9e69c7efb0e1be1",
  measurementId: "G-X4GH90ERD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);