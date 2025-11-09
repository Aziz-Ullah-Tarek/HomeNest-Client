// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgxInBBOYfa_VlrNiawg9VZWnqfnDu3l4",
  authDomain: "homenest-30d35.firebaseapp.com",
  projectId: "homenest-30d35",
  storageBucket: "homenest-30d35.firebasestorage.app",
  messagingSenderId: "816264046863",
  appId: "1:816264046863:web:0f402fc2d9ef756888b67a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;