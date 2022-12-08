import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';
import process from 'process'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
};
  

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();


export const signIn = async(emailAndPassword) => {
    try {
        const data = await signInWithEmailAndPassword(auth, emailAndPassword.email, emailAndPassword.password);
        toast.success("Successfully Signed In.");
        return data;

    } catch (error) {
        toast.error(error.message);
    }
}

export const signUp = async(emailAndPassword) => {
    try {
        const data = await createUserWithEmailAndPassword(auth, emailAndPassword.email, emailAndPassword.password);
        toast.success("Successfully Registered.");
        return data;

    } catch (error) {
        toast.error(error.message);
    }
}

export const logout = async() => {
    try {
        await signOut(auth);
        return true;

    } catch (error) {
        return false;
    }
}