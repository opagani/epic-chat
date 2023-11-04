// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJWlP2luLkw7hLulGpD_awW8hY4v-xtFI",
  authDomain: "epic-chat-84c66.firebaseapp.com",
  projectId: "epic-chat-84c66",
  storageBucket: "epic-chat-84c66.appspot.com",
  messagingSenderId: "171724376397",
  appId: "1:171724376397:web:86bdba7ed51e27aa478f04",
  measurementId: "G-8LZV4V0NXW",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Maj]ke sure we initialize only one app
const app =
  getApps().length == 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, storage };
