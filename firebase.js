import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYtZg5biEMh4LGm4vxilPR3wRlyGaZ8VI",
  authDomain: "to-do-5fbc0.firebaseapp.com",
  projectId: "to-do-5fbc0",
  storageBucket: "to-do-5fbc0.appspot.com",  
  messagingSenderId: "1089447634909",
  appId: "1:1089447634909:web:499377138dd54cc0533834"
};

const app = initializeApp(firebaseConfig);

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (err) {
  // If already initialized
  auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);
