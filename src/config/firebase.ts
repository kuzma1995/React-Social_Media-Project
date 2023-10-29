// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATX0QY3-1Tcb30_s9OHnSTLyGb9xqDHDw",
  authDomain: "social-media-project-fb3b4.firebaseapp.com",
  projectId: "social-media-project-fb3b4",
  storageBucket: "social-media-project-fb3b4.appspot.com",
  messagingSenderId: "386369936962",
  appId: "1:386369936962:web:00fc65ff80a731dbcd57db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);