import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"  
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import NavBar from "./NavBar";
import useAuth from '../hooks/useAuth';
import useUserData from '../hooks/useUserData';
import { collection, query, orderBy, where, doc, updateDoc, arrayRemove } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { CalendarMinus } from 'lucide-react';
import {toast} from "sonner";
import EventDetails from "./EventDetails";

function EventsJoined() {
    const {user, loading} = useAuth();
    const userData = useUserData(user?.uid);

    const [eventsJoined, setEventsJoined] = useState(['']);

    useEffect(() => {
        if(userData) {
            setEventsJoined(userData.eventsJoined.length > 0? userData.eventsJoined : ['']);
        }
    }, [userData]);

    const eventsRef = collection(firestore, 'events');
    const q = query(eventsRef, orderBy('createdAt', 'desc'), where('id', 'in', eventsJoined));
    const [events, loadingEvents, error] = useCollectionData(q, { idField: 'id' });

    if(loading || loadingEvents) {
        return <p>Chargement des événements...</p>
    }

    if(error) {
        return <p>Erreur : {error.message}</p>
    }

    const handleQuit = async (eventId) => {
        try {
            const docRef = doc(firestore, 'users', user.uid);
            await updateDoc(docRef, {
                eventsJoined: arrayRemove(eventId),
            });
            setEventsJoined(prev => {
                const newEventsJoined = prev.filter(event => event !== eventId)
                if(newEventsJoined.length === 0) {
                    return ['']
                }
                return newEventsJoined
            });
            toast.info("Participation à l'évènement annulée")
        } catch (error) {
            console.error("Erreur lors de la suppression de l'événement", error);
        }
    }

    return (
        <>
            <NavBar />

            <Table className="mt-20">
                <TableCaption>Evènements que vous avez rejoint.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead className="max-[344px]:hidden">Description</TableHead>
                    <TableHead className="max-[530px]:hidden">Lieu</TableHead>
                    <TableHead className="text-right max-[466px]:hidden">Date</TableHead>
                    <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events && events.length > 0 && events.map((event) => (
                        <TableRow key={event.id}>
                            <TableCell className="w-[100px]">{event.title}</TableCell>
                            <TableCell className="overflow-hidden line-clamp-4 max-h-24 max-w-96 max-[344px]:hidden">{event.description}</TableCell>
                            <TableCell className="max-[530px]:hidden">{event.location}</TableCell>
                            <TableCell className="text-right max-[466px]:hidden">{format(new Date(event.selectedDate.toDate()), "dd/MM/yyyy")}</TableCell>
                            <TableCell className="flex justify-end items-center gap-2">
                                <EventDetails event={event} />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger><Button onClick={() => handleQuit(event.id)} size="icon"><CalendarMinus /></Button></TooltipTrigger>
                                        <TooltipContent>
                                        <p>Annuler la participation</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </>
    )
}

export default EventsJoined