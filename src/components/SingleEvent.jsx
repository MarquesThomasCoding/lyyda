/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CircleX, Pencil, ALargeSmall, Text, Calendar, Clock, MapPin } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { toast } from 'sonner';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

function SingleEvent({ event }) {
    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [date, setDate] = useState(event.selectedDate.toDate());
    const [time, setTime] = useState(event.time);
    const [location, setLocation] = useState(event.location);

    const handleDelete = async (eventId) => {
        try {
            const docRef = doc(firestore, 'events', eventId);
            await deleteDoc(docRef);
            toast.info("Evènement annulé");
        } catch (error) {
            console.error("Error removing document: ", error);
            toast.error("Une erreur est survenue lors de l'annulation de l'évènement");
        }
    }

    const handleUpdate = async (eventId) => {
        try {
            const docRef = doc(firestore, 'events', eventId);
            await updateDoc(docRef, {
                title,
                description,
                selectedDate: date,
                time,
                location,
            });
            toast.success("Evènement mis à jour");
        } catch (error) {
            console.error("Error updating document: ", error);
            toast.error("Une erreur est survenue lors de la mise à jour de l'évènement");
        }
    }

    return (
        <TableRow key={event.id}>
            <TableCell className="font-medium">{event.title}</TableCell>
            <TableCell className="overflow-hidden line-clamp-4 max-h-24 max-w-96 max-[344px]:hidden">{event.description}</TableCell>
            <TableCell className="text-right max-[436px]:hidden">{format(new Date(event.selectedDate.toDate()), "dd/MM/yyyy")}, {event.time}</TableCell>
            <TableCell className="flex items-center gap-2 justify-end">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Dialog>
                                <DialogTrigger><Button size="icon"><Pencil /></Button></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                    <DialogTitle>Modifier l&#39;évènement</DialogTitle>
                                    <DialogDescription>
                                        Vous pouvez modifier les informations de l&#39;évènement.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-1 items-center gap-2">
                                            <Label htmlFor="title" className="flex items-center gap-4">
                                                <ALargeSmall />
                                                Titre
                                            </Label>
                                            <Input
                                            id="title"
                                            defaultValue={event.title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 items-center gap-2">
                                            <Label htmlFor="description" className="flex items-center gap-4">
                                                <Text />
                                                Description
                                            </Label>
                                            <Textarea
                                            id="description"
                                            defaultValue={event.description}
                                            className="resize-none h-32"
                                            onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 items-center gap-2">
                                            <div className="grid grid-cols-1 items-center gap-2">
                                                <Label htmlFor="date" className="flex items-center gap-4">
                                                    <Calendar />
                                                    Date
                                                </Label>
                                                <DatePicker className="w-auto" date={date} setDate={setDate} />
                                            </div>
                                            <div className="grid grid-cols-1 items-center gap-2">
                                                <Label htmlFor="time" className="flex items-center gap-4">
                                                    <Clock />
                                                    Heure
                                                </Label>
                                                <Input
                                                id="time"
                                                type="time"
                                                defaultValue={event.time}
                                                onChange={(e) => setTime(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 items-center gap-2">
                                            <Label htmlFor="location" className="flex items-center gap-4">
                                                <MapPin />
                                                Lieu
                                            </Label>
                                            <Input
                                            id="location"
                                            defaultValue={event.location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button onClick={() => handleUpdate(event.id)}>Sauvegarder</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>Modifier l&#39;évènement</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <AlertDialog>
                                <AlertDialogTrigger><Button variant="destructive" size="icon"><CircleX /></Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Êtes-vous sûrs de vouloir annuler cet évènement</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Cette action ne peut pas être annulée. L&#39;évènement sera supprimé de manière permanente pour tous les utilisateurs.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Fermer</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(event.id)}>Confirmer</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>Annuler l&#39;évènement</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </TableCell>
        </TableRow>
    )
}

export default SingleEvent;