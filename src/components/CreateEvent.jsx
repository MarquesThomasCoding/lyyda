import { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import { CirclePlus, Clock } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DatePickerWithRange } from './DatePicker';
import { addDays } from "date-fns";

import { toast } from "sonner"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import TimePicker from './TimePicker';


function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 0),
  });
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return <p>Chargement de l&apos;utilisateur...</p>;
  }

  const handleDateChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    if(!title || !description || !selectedDateRange || !time || !location) {
      setShowError(true);
      return;
    }

    try {
      const eventRef = await addDoc(collection(firestore, 'events'), {
        title,
        description,
        selectedDateRange,
        time,
        location,
        createdAt: new Date(),
        creator: user.uid,
      });

      await updateDoc(eventRef, { id: eventRef.id });

      toast.success("Votre événement a été créé avec succès")
      navigate('/');
    } catch (error) {
      toast.error("Une erreur est survenue lors de la création de l'événement")
      navigate('/');
    }
  };

  return (
    <Sheet>
      <SheetTrigger><Button variant='outline' size='icon' className="bg-slate-900 border-none"><CirclePlus /></Button></SheetTrigger>
      <SheetContent className="bg-slate-900 border-slate-500">
        <SheetHeader>
          <SheetTitle className="text-slate-200">Créer un évènement</SheetTitle>
          <SheetDescription>
            <form onSubmit={handleCreateEvent} className='flex flex-col gap-4 text-slate-200'>
              {showError && <p className='text-red-600 bg-red-200 border border-red-600 p-4 rounded-xl'>Vous n'avez pas rempli tous les champs</p>}
              <Input className="bg-slate-800 border-slate-500" type="text" placeholder="Titre de l'évènement" value={title} onChange={(e) => setTitle(e.target.value)}/>
              <Textarea className="bg-slate-800 border-slate-500 resize-none h-32" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description de l'événement" />
              <DatePickerWithRange onDateChange={handleDateChange} />
              <TimePicker selectedTime={time} onTimeChange={handleTimeChange} />
              <Input className="bg-slate-800 border-slate-500" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Lieu de l'événement" />
              <Button type="submit" variant='secondary'>Créer l&apos;événement</Button>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}


export default CreateEvent;