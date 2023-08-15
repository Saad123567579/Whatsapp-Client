// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDst3CWsrRMIwyfurnyy-Ji8RbLjFj3WHo",
  authDomain: "mywhatsapp-e3d8f.firebaseapp.com",
  projectId: "mywhatsapp-e3d8f",
  storageBucket: "mywhatsapp-e3d8f.appspot.com",
  messagingSenderId: "107389058017",
  appId: "1:107389058017:web:225a73155f720d9f3fb0a0",
  measurementId: "G-V72C43VH3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);