// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_-hQLzk4vUm_nb3kwFOwt2StJE1rGEcA",
  authDomain: "webbshop-2ef66.firebaseapp.com",
  projectId: "webbshop-2ef66",
  storageBucket: "webbshop-2ef66.firebasestorage.app",
  messagingSenderId: "992297114136",
  appId: "1:992297114136:web:604e144e9537bad67e816d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }