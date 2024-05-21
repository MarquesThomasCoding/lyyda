import { firestore } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EventsList from './EventsList';
import CreateEvent from './CreateEvent';


const Home = () => {
  const { user, loading: authLoading } = useAuth();



  const userRef = collection(firestore, 'users');
  const userQuery = query(userRef);
  const [userData, userDataLoading, userDataError] = useCollectionData(userQuery, { idField: 'id' });
  const userDoc = user && userData && userData.find(doc => doc.id === user.uid);
  

  if (authLoading || userDataLoading) {
    return <p>Chargement de l&apos;utilisateur...</p>;
  }

  return (
    <div className='m-14'>
      <div className="flex gap-2 items-end">
        <h1 className='text-5xl'>Lyyda</h1>
      </div>

      {user && (
        <Alert className="absolute top-0 right-0 m-4 mr-14 w-fit">
          <AlertTitle className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {userDataError && <p className='text-red-400 bg-red-200 border border-red-400 p-4 rounded-xl mt-10'>Erreur lors de la récupération des données de l&#39;utilisateur</p>}
            {userDoc.username}
            <CreateEvent />
          </AlertTitle>
        </Alert>
      
      )}

      <EventsList />
      
    </div>
  );
};

export default Home;
