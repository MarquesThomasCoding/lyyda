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
import { useState } from 'react';
import { Eye, MapPin, Clock } from 'lucide-react';

function EventDetails({ event }) {
  const [open, setOpen] = useState(false);

  return <Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger><Button className="flex gap-2"><Eye />Voir plus</Button></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle className="mb-4 text-4xl">{event.title}</DrawerTitle>
      <DrawerDescription className='flex flex-col gap-2'>
        <div className="flex gap-2"><MapPin />{event.location}</div>
        <div className="flex gap-2"><Clock />{event.time}</div>
        <Separator />
        <p>{event.description}</p>
      </DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose>
        <Button variant="secondary">Fermer</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
}

export default EventDetails;