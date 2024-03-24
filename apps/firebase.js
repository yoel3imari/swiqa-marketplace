// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHVFIB1gkkymLepEM8_LLNe_qwxv7vW5U",
  authDomain: "swiqa-286fe.firebaseapp.com",
  projectId: "swiqa-286fe",
  storageBucket: "swiqa-286fe.appspot.com",
  messagingSenderId: "1016681932485",
  appId: "1:1016681932485:web:e72b7634c06e9aeb4af2ac"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);