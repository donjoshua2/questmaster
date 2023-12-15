import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD6VHl7FgzIhG2nQnylwObToRh-cHu9ttQ",
    authDomain: "todo-app-a68fd.firebaseapp.com",
    projectId: "todo-app-a68fd",
    storageBucket: "todo-app-a68fd.appspot.com",
    messagingSenderId: "852579976789",
    appId: "1:852579976789:web:3441b5d4796fd1e56f76dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a Firestore instance
const firestore = getFirestore(app);

// Export the Firestore instance
export { firestore, app };
