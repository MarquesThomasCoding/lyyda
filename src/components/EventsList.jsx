/* eslint-disable react/prop-types */
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Search, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import EventDetails from './EventDetails';
import { firestore } from '../firebase';
import { useEffect, useState } from 'react';

function EventsList() {
    const eventsRef = collection(firestore, 'events');
    const q = query(eventsRef, orderBy('createdAt', 'desc'));
    const [events, loading, error] = useCollectionData(q, { idField: 'id' });
    const [filteredEvents, setFilteredEvents] = useState(null);
    const [search, setSearch] = useState('');

    const [eventsIndex, setEventsIndex] = useState(0);
    const [maxEventsIndex, setMaxEventsIndex] = useState(false);
    const [minEventsIndex, setMinEventsIndex] = useState(true);


    const handleNext = () => {
        setEventsIndex(eventsIndex + 10);
    }

    const handlePrevious = () => {
        setEventsIndex(eventsIndex - 10);
    }

    useEffect(() => {
        if(events) {
            if(eventsIndex + 10 >= events.length) {
                setMaxEventsIndex(true);
            }
            else if(eventsIndex + 10 < events.length) {
                setMaxEventsIndex(false);
            }
            if(eventsIndex > 0) {
                setMinEventsIndex(false);
            }
            else if(eventsIndex == 0) {
                setMinEventsIndex(true);
            }
            const newFilteredEvents = events.filter(event => event.title.toLowerCase().includes(search.toLowerCase())).slice(eventsIndex, eventsIndex + 10);
            setFilteredEvents(newFilteredEvents);
        }
    }, [search, events, eventsIndex]);

    return (
        <>
            <SearchBar search={search} setSearch={setSearch} />
            {loading && <p className='border border-gray p-4 rounded-xl mt-10'>Chargement des événements...</p>}
            {error && <p className='text-red-400 bg-red-200 border border-red-400 p-4 rounded-xl mt-10'>Erreur : {error.message}</p>}
    
            <ul className='grid grid-cols-3 gap-4 mt-10 max-[900px]:grid-cols-2 max-[700px]:grid-cols-1'>
                {filteredEvents && filteredEvents.length === 0 && <p>Aucun événement à afficher</p>}
                {filteredEvents && filteredEvents.map(event => (
                    <li key={event.id}>
                    <Card>
                        <CardHeader>
                        <CardTitle className="flex capitalize justify-between">{event.title}<EventDetails event={event} /></CardTitle>
                        <CardDescription><p className='flex gap-1'><MapPin /><span>{event.location}</span></p></CardDescription>
                        </CardHeader>
                        <CardContent className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {event.description}
                        </CardContent>
                    </Card>
                    </li>
                ))}
            </ul>
            <div className='flex justify-center mt-10 gap-4'>
                <Button disabled={minEventsIndex} onClick={handlePrevious}><ChevronLeft />Retour</Button>
                <Button disabled={maxEventsIndex} onClick={handleNext}>Voir plus<ChevronRight /></Button>
            </div>
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