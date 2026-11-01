import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdH9DPDWTdUaUG7iCeFohYOSy-fZ2fa9k",
  authDomain: "ambulanceexpress.firebaseapp.com",
  projectId: "ambulanceexpress",
  storageBucket: "ambulanceexpress.firebasestorage.app",
  messagingSenderId: "1000293682857",
  appId: "1:1000293682857:web:5ea03bf79424d67fb9e3b8",
  measurementId: "G-N3PLX3T76Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth (React Native-এ এটি অটোমেটিক পার্সিস্টেন্স হ্যান্ডেল করে)
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };