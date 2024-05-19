import { firestore, useLogout } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CreateEvent from './CreateEvent';
import EventDetails from './EventDetails';


const Home = () => {
  const { user, loading: authLoading } = useAuth();
  const { logout } = useLogout();

  const eventsRef = collection(firestore, 'events');
  const q = query(eventsRef, orderBy('createdAt', 'desc'));
  const [events, loading, error] = useCollectionData(q, { idField: 'id' });

  const userRef = collection(firestore, 'users');
  const userQuery = query(userRef);
  const [userData, userDataLoading, userDataError] = useCollectionData(userQuery, { idField: 'id' });
  const userDoc = user && userData && userData.find(doc => doc.id === user.uid);
  

  if (authLoading || userDataLoading) {
    return <p>Chargement de l&apos;utilisateur...</p>;
  }

  return (
    <div className='text-slate-200 m-14'>
      <div className="flex gap-2 items-center">
        <h1 className='text-5xl'>Événements</h1>
        {user && <CreateEvent />}
      </div>
      {user && (
        <Alert className="absolute top-0 right-0 m-4 w-fit bg-slate-800 border-slate-600">
          <AlertTitle className="text-slate-200 flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {userDataError && <p className='text-red-400 bg-red-200 border border-red-400 p-4 rounded-xl mt-10'>Erreur lors de la récupération des données de l'utilisateur</p>}
            {userDoc.username}
          </AlertTitle>
          <AlertDescription className="text-slate-400">
            {user.email}
            <Button onClick={logout} className="ml-2">Déconnexion</Button>
          </AlertDescription>
        </Alert>
      
      )}
      {loading && <p className='text-slate-200 bg-slate-600 border border-gray p-4 rounded-xl mt-10'>Chargement des événements...</p>}
      {error && <p className='text-red-400 bg-red-200 border border-red-400 p-4 rounded-xl mt-10'>Erreur : {error.message}</p>}
      <ul className='grid grid-cols-3 gap-4 mt-10'>
        {events && events.map(event => (
          <li key={event.id}>
            <Card className="bg-slate-800 text-slate-200 border-slate-600">
              <CardHeader>
                <CardTitle className="capitalize">{event.title}</CardTitle>
                <CardDescription><p className='flex gap-1'><i className="fi fi-bs-map-marker-home"></i><span>{event.location}</span></p></CardDescription>
              </CardHeader>
              <CardContent>
                {event.description}
              </CardContent>
              <CardFooter>
                <EventDetails event={event} />
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
