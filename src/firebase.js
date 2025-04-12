import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Double-check your config values
const firebaseConfig = {
  apiKey: "AIzaSyASTmRcL86XvB1GKqtWZNfw4qVJxfMY1ew",
  authDomain: "igneous-walker-456517-m1.firebaseapp.com",
  projectId: "igneous-walker-456517-m1",
  storageBucket: "igneous-walker-456517-m1.appspot.com",
  messagingSenderId: "376775095185",
  appId: "1:376775095185:web:c36d6bc0402f8f801ee030"
};

// Initialize only once
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);