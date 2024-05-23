import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup,onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const auth = getAuth(app);

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (user) {
      const userRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          bio: ''
        });
      }
    }
  } catch (error) {
    console.error('Error signing in with Google', error);
  }
};

const authStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully.");
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return { logout };
};


export { analytics, firestore, auth, useLogout, signInWithGoogle, authStateListener };