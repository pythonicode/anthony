// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyA2MQccxivcpNNo6b5-YoRktFXmjQBvb9U",
  authDomain: "anthony-riley.firebaseapp.com",
  projectId: "anthony-riley",
  storageBucket: "anthony-riley.appspot.com",
  messagingSenderId: "413136491618",
  appId: "1:413136491618:web:315a2f8ea46b469034ed3b",
  measurementId: "G-5PBCP97JSL",
};

// Initialize Firebase
const app = initializeApp(config);
export const firestore = getFirestore(app);
