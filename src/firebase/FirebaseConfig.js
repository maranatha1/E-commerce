// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcoH0ePs-De1sry55jOqK3w4wzEmILcq4",

  authDomain: "euphoria-store.firebaseapp.com",

  databaseURL: "https://euphoria-store-default-rtdb.firebaseio.com",

  projectId: "euphoria-store",

  storageBucket: "euphoria-store.appspot.com",

  messagingSenderId: "714301536737",

  appId: "1:714301536737:web:803aff50266cc8d41dfaa0"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
export const FIREBASE_REALTIME_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
