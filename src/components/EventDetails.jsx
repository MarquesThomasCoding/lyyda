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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Eye, MapPin, Clock, CircleUser } from 'lucide-react';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useUserData from '../hooks/useUserData';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../firebase";
import { toast } from "sonner";
import MapComponent from "./MapComponent";
import { Link } from 'react-router-dom';

function EventDetails({ event }) {
  const { user, loading } = useAuth();
  const userData = useUserData(user?.uid);
  const [eventsJoined, setEventsJoined] = useState([]);

  const creatorData = useUserData(event.creator);

  useEffect(() => {
    if (userData && userData.eventsJoined) {
      setEventsJoined(userData.eventsJoined);
    }
  }, [userData]);

  if(!creatorData) {
    return
  }

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
        eventsJoined: arrayUnion(eventId)
      }).then(() => {
        setEventsJoined(prev => [...prev, eventId]);
        toast.success('Evènement rejoint avec succès');
      });
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
      <DrawerTitle className="flex justify-between mb-4 text-4xl">
        <span>{event.title}</span>
      </DrawerTitle>
      <DrawerDescription className='flex flex-col gap-2'>
        <div className="flex gap-2"><MapPin />{event.location}</div>
        <div className="flex gap-2"><Clock />{event.time}</div>
        <div className="flex items-center gap-2">
          <CircleUser />
          <Link to={"/profile/" + creatorData.uid}>
            <span className="flex items-center gap-2 text-lg">
              <Avatar className="w-6 h-6">
                  <AvatarImage src={creatorData.photoURL} alt="Avatar" />
                  <AvatarFallback>{creatorData.username.charAt(0) + creatorData.username.charAt(creatorData.username.length-1)}</AvatarFallback>
              </Avatar>
              {creatorData.username}
            </span>
          </Link>
        </div>
        <div className="flex gap-2">
          <Badge >{event.tag}</Badge>
        </div>
        <Separator />
        <p>{event.description}</p>
      </DrawerDescription>
    </DrawerHeader>
    <MapComponent address={event.location} />
    <DrawerFooter>
      <Button disabled={!user} onClick={() => handleJoin(event.id)}>Rejoindre</Button>
      <DrawerClose>
        <Button variant="secondary">Fermer</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
}

export default EventDetails;