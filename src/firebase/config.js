// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbXQrmAE0_ML59Ub1Bs4r1KKHM-MPD_L0",
  authDomain: "questioner-db50f.firebaseapp.com",
  projectId: "questioner-db50f",
  storageBucket: "questioner-db50f.firebasestorage.app",
  messagingSenderId: "547999483651",
  appId: "1:547999483651:web:cf1f3cc9a3761fb8488b36",
  measurementId: "G-4CW9704K36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const projectFireStore = getFirestore(app);
const projectAuth = getAuth(app);
const projectStorage = getStorage(app);

// Timestamp
const timestamp = serverTimestamp;

export { projectFireStore, projectAuth, projectStorage, timestamp };