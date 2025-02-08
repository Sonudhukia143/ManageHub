// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj5hhYzT0LiNWBQ5reOSV7_bp9l-ciXBo",
  authDomain: "handlehub-8f070.firebaseapp.com",
  databaseURL: "https://handlehub-8f070-default-rtdb.firebaseio.com",
  projectId: "handlehub-8f070",
  storageBucket: "handlehub-8f070.firebasestorage.app",
  messagingSenderId: "771295283489",
  appId: "1:771295283489:web:61744cb37f9e9ce00cd660",
  measurementId: "G-CPMQV1WRGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;