import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCqwU7Klz9JgWv0-xD2uU9rl_eqRTkgw3Q",
    authDomain: "menu-45f18.firebaseapp.com",
    projectId: "menu-45f18",
    storageBucket: "menu-45f18.appspot.com",
    messagingSenderId: "851505743604",
    appId: "1:851505743604:web:6e80dfe439ce4d9db0c0a1"
  };

  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db};