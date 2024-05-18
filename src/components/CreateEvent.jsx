// src/components/CreateEvent.jsx
import { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return <p>Chargement de l&apos;utilisateur...</p>;
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    if(!title || !description || !date || !time || !location) {
      setShowError(true);
      return;
    }

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
      navigate('/');
    } catch (error) {
      console.error("Erreur de création d'événement", error);
    }
  };

  return (
    <form onSubmit={handleCreateEvent} className='flex flex-col gap-4 m-14 text-slate-200'>
      {showError && <p className='text-red-400 bg-red-200 border border-red-400 p-4 rounded-xl'>Vous n'avez pas rempli tous les champs</p>}
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Titre de l'événement" 
        className='mb-4 w-full p-2 rounded-lg bg-notSoDark text-slate-200 border border-slate-600'
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description de l'événement" 
        className='mb-4 w-full p-2 rounded-lg bg-notSoDark text-slate-200 border border-slate-600 resize-none h-32'
      />
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
        className='mb-4 w-full p-2 rounded-lg bg-notSoDark text-slate-200 border border-slate-600'
      />
      <input 
        type="time" 
        value={time} 
        onChange={(e) => setTime(e.target.value)} 
        className='mb-4 w-full p-2 rounded-lg bg-notSoDark text-slate-200 border border-slate-600'
      />
      <input 
        type="text" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Lieu de l'événement" 
        className='mb-4 w-full p-2 rounded-lg bg-notSoDark text-slate-200 border border-slate-600'
      />
      <button 
      className='w-full bg-gray font-bold p-2 rounded-lg text-notSoDark transition-all hover:bg-notSoDark hover:text-slate-200' 
      type="submit">Créer l&apos;événement</button>
    </form>
  );
};

export default CreateEvent;
