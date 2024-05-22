import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const useUserData = (uid) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (uid) {
          const docRef = await getDoc(doc(firestore, 'users', uid));
          if (docRef.exists()) {
            setUserData(docRef.data());
          } else {
            console.error("Document doesn't exist");
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [uid]);

  return userData;
};

export default useUserData;
