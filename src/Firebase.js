import { useEffect, useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQPoSwGff2mDJDw8KuNBMFDMAK3MeS_iM",
  authDomain: "react-login-b27eb.firebaseapp.com",
  projectId: "react-login-b27eb",
  storageBucket: "react-login-b27eb.appspot.com",
  messagingSenderId: "481014154909",
  appId: "1:481014154909:web:68bff5a164231170acf674"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
    signOut(auth);
}

// Custom Hook
export function useAuth() {
    const [curUser, setCurUser] = useState();
    useEffect(() => {
        onAuthStateChanged(auth, user => setCurUser(user))
    }, [])
    return curUser;
}