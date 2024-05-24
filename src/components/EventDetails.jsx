/* eslint-disable react/prop-types */
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Eye, MapPin, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useUserData from '../hooks/useUserData';
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { toast } from "sonner";

function EventDetails({ event }) {
  const { user, loading } = useAuth();
  const userData = useUserData(user?.uid);
  const [eventsJoined, setEventsJoined] = useState(userData?.eventsJoined || []);

  useEffect(() => {
    if (userData) {
      setEventsJoined(userData.eventsJoined);
    }
  }, [userData]);

  if (loading) {
    return <p>Chargement de l&apos;utilisateur...</p>;
  }

  const handleJoin = async (eventId) => {
    if(eventsJoined.includes(eventId)) {
      toast.error("Vous avez déjà rejoint cet événement");
      return;
    }
    try {
      const docRef = doc(firestore, 'users', user.uid);
      await updateDoc(docRef, {
        eventsJoined: [...eventsJoined, eventId],
      });
      toast.success('Evènement rejoint avec succès');
    } catch (error) {
      toast.error("Une erreur est survenue lors de la partcipation à l'événement");
    }
  }

  return <Drawer>
    {/* Si la fenêtre fait plus de 1100px, on affiche <span>Voir plus</span> */}
  <DrawerTrigger>
    <Button variant="outline" className="flex gap-2">
      <Eye />
      <span className="max-[1100px]:hidden">Voir plus</span>
    </Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle className="mb-4 text-4xl">{event.title}</DrawerTitle>
      <DrawerDescription className='flex flex-col gap-2'>
        <div className="flex gap-2"><MapPin />{event.location}</div>
        <div className="flex gap-2"><Clock />{event.time}</div>
        <div className="flex gap-2">{}</div>
        <Separator />
        <p>{event.description}</p>
      </DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button onClick={() => handleJoin(event.id)}>Rejoindre</Button>
      <DrawerClose>
        <Button variant="secondary">Fermer</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
}

export default EventDetails;