// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxxfl8vvZtoFxG70-0Vl6goI4PRjM72bA",
  authDomain: "rifa-papeleria.firebaseapp.com",
  projectId: "rifa-papeleria",
  storageBucket: "rifa-papeleria.firebasestorage.app",
  messagingSenderId: "854719955875",
  appId: "1:854719955875:web:abf6dfa3cfa2e697a19016",
  measurementId: "G-46HQZC2H4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (solo en el cliente)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firestore
export const db = getFirestore(app);

export { app, analytics };