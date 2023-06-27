// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from  "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiFUEDx37V9gweOHFp5LiRhTrDF3KhaP8",
  authDomain: "todo-firebase-12667.firebaseapp.com",
  projectId: "todo-firebase-12667",
  storageBucket: "todo-firebase-12667.appspot.com",
  messagingSenderId: "125786409313",
  appId: "1:125786409313:web:d9a826d5554f53dfa15d20",
  measurementId: "G-01EGZ4S3L7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)// นำค่าไปใช้
export const auth = getAuth(app);
