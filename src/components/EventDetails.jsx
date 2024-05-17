// src/components/EventDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventAndCreator = async () => {
      try {
        // Récupération de l'événement
        const eventDoc = await getDoc(doc(firestore, 'events', id));
        if (eventDoc.exists()) {
          const eventData = eventDoc.data();
          setEvent(eventData);

          // Récupération du créateur
          const creatorDoc = await getDoc(doc(firestore, 'users', eventData.creator));
          if (creatorDoc.exists()) {
            setCreator(creatorDoc.data());
          } else {
            setError('Créateur non trouvé');
          }
        } else {
          setError('Événement non trouvé');
        }
      } catch (err) {
        setError('Erreur de chargement : ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndCreator();
  }, [id]);

  if (loading) {
    return <p>Chargement des détails de l&apos;événement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {event && (
        <div>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Heure: {event.time}</p>
          <p>Lieu: {event.location}</p>
          {creator && <p>Créé par: {creator.email}</p>}
        </div>
      )}
    </div>
  );
};

export default EventDetails;
