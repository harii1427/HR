// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4w_5cHd3V3pfDsbl2GKyYOsf985amECg",
  authDomain: "uniqhr-93d43.firebaseapp.com",
  databaseURL: "https://uniqhr-93d43-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "uniqhr-93d43",
  storageBucket: "uniqhr-93d43.firebasestorage.app",
  messagingSenderId: "508637480863",
  appId: "1:508637480863:web:c1cd28865d0c514ff8dfaa",
  measurementId: "G-RZ322V107Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
