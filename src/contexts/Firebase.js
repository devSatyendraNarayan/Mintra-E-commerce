// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRpbLLTw3H2TTr6MKdKq5On2_0wkGjnK0",
  authDomain: "mintra-be870.firebaseapp.com",
  projectId: "mintra-be870",
  storageBucket: "mintra-be870.appspot.com",
  messagingSenderId: "423987346686",
  appId: "1:423987346686:web:264fb48faa30d5369139af",
  measurementId: "G-1HE4JZWYPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };