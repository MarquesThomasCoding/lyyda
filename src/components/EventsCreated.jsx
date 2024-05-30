import NavBar from "./NavBar"
import useAuth from '../hooks/useAuth'
import useUserData from '../hooks/useUserData'
import { useEffect, useState } from "react"
import { collection, query, where } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { firestore } from "../firebase"
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import SingleEvent from "./SingleEvent"

function EventsCreated() {
    const {user, loading} = useAuth();
    const userData = useUserData(user?.uid);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        if(userData) {
            setUserId(userData.uid);
        }
    }, [userData]);

    const eventsRef = collection(firestore, 'events');
    const q = query(eventsRef, where('creator', '==', userId));
    const [events, loadingEvents, error] = useCollectionData(q, { idField: 'id' });

    if(loading || loadingEvents) {
        return <>
            <NavBar />
            <p>Chargement des évènements...</p>
        </>
    }

    if(error) {
        return <>
            <NavBar />
            <p>Erreur : {error.message}</p>
        </>
    }

    return (
        <>
            <NavBar />
                <Table className="mt-20">
                    <TableCaption>Liste de vos évènements.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Titre</TableHead>
                            <TableHead className="max-[344px]:hidden">Description</TableHead>
                            <TableHead className="text-right max-[436px]:hidden">Date et heure</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events && events.length > 0 && events.map(event => (
                            <SingleEvent key={event.id} event={event} />
                        ))}
                    </TableBody>
                </Table>
        </>
    )
}

export default EventsCreated