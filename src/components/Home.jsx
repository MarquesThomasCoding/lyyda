import { Link } from 'react-router-dom';
import { firestore, useLogout } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { user, loading: authLoading } = useAuth();
  const { logout } = useLogout();

  const eventsRef = collection(firestore, 'events');
  const q = query(eventsRef, orderBy('createdAt', 'desc'));
  const [events, loading, error] = useCollectionData(q, { idField: 'id' });

  if (authLoading) {
    return <p>Chargement de l&apos;utilisateur...</p>;
  }

  return (
    <div className='text-slate-200 m-14'>
      <h1 className='text-5xl'>Événements</h1>
      {user && (
        <div className='flex flex-col absolute top-0 right-0 m-4 bg-notSoDark p-4 rounded-xl gap-2'>
          <p className='text-gray'>Connecté en tant que : <span className='text-slate-200'>{user.email}</span></p>
          <button className='w-fit flex items-center gap-2 bg-gray font-bold p-2 rounded-lg text-notSoDark transition-all hover:bg-dark hover:text-slate-200' onClick={logout}><span>Se déconnecter</span><i className="fi fi-bs-exit h-4"></i></button>
        </div>
      )}
      {loading && <p className='text-slate-200 bg-slate-600 border border-gray p-4 rounded-xl mt-10'>Chargement des événements...</p>}
      {error && <p className='text-red-400 bg-red-200 border border-red-400 p-4 rounded-xl mt-10'>Erreur : {error.message}</p>}
      <ul className='grid grid-cols-2 gap-4 mt-10'>
        {events && events.map(event => (
          <li key={event.id} className='flex flex-col gap-4 bg-notSoDark p-4 rounded-xl border-slate-600 border'>
            <h3 className='text-3xl'>{event.title}</h3>
            <p className='text-gray'>{new Date(event.date).toLocaleDateString()} - {event.time}</p>
            <p className='flex gap-2'><i className="fi fi-bs-map-marker-home"></i><span>{event.location}</span></p>
            <p>{event.description}</p>
            <Link className='text-sky-600' to={`/event/${event.id}`}>Voir les détails</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
