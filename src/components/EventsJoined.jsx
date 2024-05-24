import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"  
import NavBar from "./NavBar";
import useAuth from '../hooks/useAuth';
import useUserData from '../hooks/useUserData';
import { collection, query, orderBy, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";
import { useEffect, useState } from "react";
import { format } from 'date-fns';

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

    return (
        <>
            <NavBar />

            <Table className="mt-20">
                <TableCaption>Evènements que vous avez rejoint.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Lieu</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events && events.length > 0 && events.map((event) => (
                        <TableRow key={event.id}>
                            <TableCell>{event.title}</TableCell>
                            <TableCell>{event.description}</TableCell>
                            <TableCell>{event.location}</TableCell>
                            <TableCell className="text-right">{format(new Date(event.selectedDate.toDate()), "LLL dd, yyyy")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </>
    )
}

export default EventsJoined