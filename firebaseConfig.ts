import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBdwYSCIHP_3f-12cQ__HkFVxQWCQgv0U8",
    authDomain: "todoapp-e1dec.firebaseapp.com",
    projectId: "todoapp-e1dec",
    storageBucket: "todoapp-e1dec.appspot.com",
    messagingSenderId: "585723084006",
    appId: "1:585723084006:web:1818716bbc7b861bd00f27",
    measurementId: "G-LYMMN9JJKD"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
