// Import the functions you need from the SDKs you need
import { Platform } from "react-native";
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {
  addDoc,
  getDoc,
  collection,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQMISfKvCQHv5sv869CyJYYtFdJi6XM00",
  authDomain: "take-a-seat-849a0.firebaseapp.com",
  databaseURL: "https://take-a-seat-849a0-default-rtdb.firebaseio.com",
  projectId: "take-a-seat-849a0",
  storageBucket: "take-a-seat-849a0.appspot.com",
  messagingSenderId: "767263625173",
  appId: "1:767263625173:web:8be874c4b8563c319c375c",
  measurementId: "G-BYGB905B6Z",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export { addDoc, getDoc, collection, setDoc };

const choiceAuthLocation = () => {
  if (Platform.OS === "android") {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  }
  if (Platform.OS === "web") {
    return getAuth(app);
  }
};

export const authorisation = choiceAuthLocation();
