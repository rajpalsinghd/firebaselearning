// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoOWYTptOKmbZ7-iXPUpHC9QKfoZq-qsM",
  authDomain: "petrol-511dc.firebaseapp.com",
  projectId: "petrol-511dc",
  storageBucket: "petrol-511dc.appspot.com",
  messagingSenderId: "106178534703",
  appId: "1:106178534703:web:8cbba01e362f521e2155da",
  measurementId: "G-PTXKFQFXEZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, provider, db };
