/* eslint-disable react/prop-types */
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Search, MapPin, ChevronLeft, ChevronRight, Clock, ArrowDown01, ArrowDownAZ, Calendar } from 'lucide-react';
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
        setEventsIndex(eventsIndex + 9);
    }

    const handlePrevious = () => {
        setEventsIndex(eventsIndex - 9);
    }

    useEffect(() => {
        if(events) {
            if(eventsIndex + 9 >= events.length) {
                setMaxEventsIndex(true);
            }
            else if(eventsIndex + 9 < events.length) {
                setMaxEventsIndex(false);
            }
            if(eventsIndex > 0) {
                setMinEventsIndex(false);
            }
            else if(eventsIndex == 0) {
                setMinEventsIndex(true);
            }
            const newFilteredEvents = events.filter(event => event.title.toLowerCase().includes(search.toLowerCase())|| event.description.toLowerCase().includes(search.toLowerCase())).slice(eventsIndex, eventsIndex + 9);
            setFilteredEvents(newFilteredEvents);
        }
    }, [search, events, eventsIndex]);

    return (
        <>
            <SearchBar search={search} setSearch={setSearch} />
            {loading && <p className='border border-gray p-4 rounded-xl mt-10'>Chargement des événements...</p>}
            {error && <p className='text-red-400 bg-red-200 border border-red-400 p-4 rounded-xl mt-10'>Erreur : {error.message}</p>}
            <FiltersComponent filteredEvents={filteredEvents} setFilteredEvents={setFilteredEvents} />
    
            <ul className='grid grid-cols-3 gap-4 mt-10 max-[900px]:grid-cols-2 max-[700px]:grid-cols-1'>
                {filteredEvents && filteredEvents.length === 0 && <p>Aucun événement à afficher</p>}
                {filteredEvents && filteredEvents.map(event => (
                    <li key={event.id}>
                    <Card className="h-full">
                        <CardHeader>
                        <CardTitle className="flex capitalize justify-between"><span className='overflow-hidden whitespace-nowrap text-ellipsis'>{event.title}</span><EventDetails event={event} /></CardTitle>
                        <CardDescription>
                            <div className='flex flex-col'>
                                <div className='flex items-center'>
                                    <MapPin className="mr-1 h-4 w-4" /><span className='overflow-hidden whitespace-nowrap text-ellipsis'>{event.location}</span>
                                </div>
                                <div className='flex items-center'>
                                    <Calendar className="mr-1 h-4 w-4" /><span>{event.selectedDate.toDate().toLocaleDateString()}</span>
                                </div>
                                <div className='flex items-center'>
                                    <Clock className="mr-1 h-4 w-4" /><span>{event.time}</span>
                                </div>
                            </div>
                        </CardDescription>
                        </CardHeader>
                        <CardContent className="overflow-hidden line-clamp-6 whitespace-normal max-h-36 mb-2">
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

function FiltersComponent({ filteredEvents, setFilteredEvents }) {

    const handleSortByDate = () => {
        const sortedEvents = [...filteredEvents].sort((a, b) => b.selectedDate.toDate() - a.selectedDate.toDate());
        setFilteredEvents(sortedEvents);
    }

    const handleSortByAZ = () => {
        const sortedEvents = [...filteredEvents].sort((a, b) => a.title.localeCompare(b.title));
        setFilteredEvents(sortedEvents);
    }

    return (
        <div className='flex justify-between gap-4 mt-10'>
            <div>
                {/* Filtre par utilisateur */}
            </div>
            <div className='flex items-center gap-2'>
                {/* Tri par date la plus récente */}
                <Button onClick={handleSortByDate}>Date <ArrowDown01 className="ml-1 h-4 w-4" /></Button>
                {/* Tri par ordre alphabetique */}
                <Button onClick={handleSortByAZ}>A-Z <ArrowDownAZ className="ml-1 h-4 w-4" /></Button>
            </div>
        </div>
    )
}

export default EventsList;