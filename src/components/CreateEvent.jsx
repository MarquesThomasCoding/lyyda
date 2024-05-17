// src/components/CreateEvent.jsx
import { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return <p>Chargement de l&apos;utilisateur...</p>;
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      // Ajouter le document sans identifiant
      const eventRef = await addDoc(collection(firestore, 'events'), {
        title,
        description,
        date,
        time,
        location,
        createdAt: new Date(),
        creator: user.uid,
      });

      // Ajouter l'identifiant du document au document lui-même
      await updateDoc(eventRef, { id: eventRef.id });

      // Rediriger ou montrer un message de succès
      console.log('Event created with ID:', eventRef.id);
    } catch (error) {
      console.error("Erreur de création d'événement", error);
    }
  };

  return (
    <form onSubmit={handleCreateEvent}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Titre de l'événement" 
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description de l'événement" 
      />
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <input 
        type="time" 
        value={time} 
        onChange={(e) => setTime(e.target.value)} 
      />
      <input 
        type="text" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Lieu de l'événement" 
      />
      <button type="submit">Créer l&apos;événement</button>
    </form>
  );
};

export default CreateEvent;
