import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
const firebaseConfig = {
    apiKey: "AIzaSyAAQDbjiMSag0IZMruX_j8ZnlRVMM3GQ0k",
    authDomain: "recychbs-313eb.firebaseapp.com",
    projectId: "recychbs-313eb",
    storageBucket: "recychbs-313eb.appspot.com",
    messagingSenderId: "672367159027",
    appId: "1:672367159027:web:98c44a5eb10ab8f96d7986",
    measurementId: "G-WXQGZPZB0K"
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);