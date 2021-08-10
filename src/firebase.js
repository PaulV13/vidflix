import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0q0FRbx7wc3l6CSxyNv4_bQOx04AFVlM",
  authDomain: "vidflix-7792e.firebaseapp.com",
  projectId: "vidflix-7792e",
  storageBucket: "vidflix-7792e.appspot.com",
  messagingSenderId: "1022128049163",
  appId: "1:1022128049163:web:6265c4ce80d148e7568b0e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
