import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDb7jonC9FRgYdhodFjANQM0CmkNOUOL7M",
    authDomain: "flashcard-task.firebaseapp.com",
    projectId: "flashcard-task",
    storageBucket: "flashcard-task.appspot.com",
    messagingSenderId: "206893546168",
    appId: "1:206893546168:web:0818fb49ed1677acdbd24d"
  };  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();