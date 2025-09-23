// Importar solo las funciones necesarias para reducir bundle size
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxxfl8vvZtoFxG70-0Vl6goI4PRjM72bA",
  authDomain: "rifa-papeleria.firebaseapp.com",
  projectId: "rifa-papeleria",
  storageBucket: "rifa-papeleria.firebasestorage.app",
  messagingSenderId: "854719955875",
  appId: "1:854719955875:web:abf6dfa3cfa2e697a19016",
  measurementId: "G-46HQZC2H4Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export { app };
