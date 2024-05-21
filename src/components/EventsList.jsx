/* eslint-disable react/prop-types */
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Search, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import EventDetails from './EventDetails';
import { firestore } from '../firebase';
import { useEffect, useState } from 'react';

function EventsList() {
    const eventsRef = collection(firestore, 'events');
    const q = query(eventsRef, orderBy('createdAt', 'desc'));
    const [events, loading, error] = useCollectionData(q, { idField: 'id' });
    const [filteredEvents, setFilteredEvents] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if(events) {
            const newFilteredEvents = events.filter(event => event.title.toLowerCase().includes(search.toLowerCase()));
            setFilteredEvents(newFilteredEvents);
        }
    }, [search, events]);

    return (
        <>
            <SearchBar search={search} setSearch={setSearch} />
            {loading && <p className='border border-gray p-4 rounded-xl mt-10'>Chargement des événements...</p>}
            {error && <p className='text-red-400 bg-red-200 border border-red-400 p-4 rounded-xl mt-10'>Erreur : {error.message}</p>}
    
            <ul className='grid grid-cols-3 gap-4 mt-10'>
                {filteredEvents && filteredEvents.length === 0 && <p>Aucun événement correspondant à votre recherche</p>}
                {filteredEvents && filteredEvents.map(event => (
                    <li key={event.id}>
                    <Card>
                        <CardHeader>
                        <CardTitle className="capitalize">{event.title}</CardTitle>
                        <CardDescription><p className='flex gap-1'><MapPin /><span>{event.location}</span></p></CardDescription>
                        </CardHeader>
                        <CardContent>
                        {event.description}
                        </CardContent>
                        <CardFooter>
                        <EventDetails event={event} />
                        </CardFooter>
                    </Card>
                    </li>
                ))}
            </ul>
        </>
    )
}

function SearchBar({ search, setSearch }) {

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className="relative flex w-auto items-center space-x-2 mt-20">
            <Search className='absolute top-2 left-4 text-zinc-400' />
            <Input className="pl-10" type="text" placeholder="Recherchez un évènement" value={search} onChange={handleSearch} />
        </div>
    )
}

export default EventsList;