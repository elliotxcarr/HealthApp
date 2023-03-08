// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD36Qoib_e9fTnN6PKwprW7-Unxj2HqjAo",
  authDomain: "fir-auth-b105d.firebaseapp.com",
  projectId: "fir-auth-b105d",
  storageBucket: "fir-auth-b105d.appspot.com",
  messagingSenderId: "809683874677",
  appId: "1:809683874677:web:f6b3b5658c2a3ce655d93c",
  databaseURL: 'https://fir-auth-b105d-default-rtdb.firebaseio.com/'
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app)
export {auth, database};