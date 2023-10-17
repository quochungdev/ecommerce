// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaL0NNO5N9GQ2f9A8Kc1rW77XKTXaR5zA",
  authDomain: "chat-e-commerce.firebaseapp.com",
  projectId: "chat-e-commerce",
  storageBucket: "chat-e-commerce.appspot.com",
  messagingSenderId: "404469807268",
  appId: "1:404469807268:web:6a656b80901b62cfd00e31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}
