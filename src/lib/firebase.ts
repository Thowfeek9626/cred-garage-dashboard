// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDI5177a-jKevP8ZTWXSzYn4VLndXsuI00",
    authDomain: "cred-garage-clone.firebaseapp.com",
    projectId: "cred-garage-clone",
    storageBucket: "cred-garage-clone.firebasestorage.app",
    messagingSenderId: "648364814224",
    appId: "1:648364814224:web:2f9b4ae0267fb16e228d15"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db,storage };
