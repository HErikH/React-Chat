import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLZj0vSI07zM0pZLSkKZX-3UExLE1wLPQ",
  authDomain: "chat-app-2314f.firebaseapp.com",
  projectId: "chat-app-2314f",
  storageBucket: "chat-app-2314f.appspot.com",
  messagingSenderId: "413026892835",
  appId: "1:413026892835:web:d17310898371f81a1e8596",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()
