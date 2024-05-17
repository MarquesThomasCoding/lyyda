// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;
