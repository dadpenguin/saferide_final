
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFdso8NLv43ZRvkYWQuOjzB3J9stGuukA",
    authDomain: "saferide-aaa.firebaseapp.com",
    projectId: "saferide-aaa",
    storageBucket: "saferide-aaa.firebasestorage.app",
    messagingSenderId: "68245247453",
    appId: "1:68245247453:web:a9951b3265e6fe85e21234",
    measurementId: "G-FZ4LVSS6XY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db, app };


