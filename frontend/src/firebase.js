import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh8oo9lnvSHLCWXrjodvAdmV5-MIA7r2k",
  authDomain: "e-commerce-3676d.firebaseapp.com",
  projectId: "e-commerce-3676d",
  storageBucket: "e-commerce-3676d.appspot.com",
  messagingSenderId: "892560810952",
  appId: "1:892560810952:web:6536cf38aa0e7bb12596fd",
  measurementId: "G-90525QXZNF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export default app;