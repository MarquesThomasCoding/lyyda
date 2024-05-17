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
    <div>
      <h1>Événements</h1>
      {user && (
        <div>
          <p>Connecté en tant que : {user.email}</p>
          <button onClick={logout}>Se déconnecter</button>
        </div>
      )}
      {loading && <p>Chargement des événements...</p>}
      {error && <p>Erreur : {error.message}</p>}
      {events && events.map(event => (
        <div key={event.id} className="event">
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleDateString()} à {event.time}</p>
          <p>Lieu : {event.location}</p>
          <Link to={`/event/${event.id}`}>Voir les détails</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
