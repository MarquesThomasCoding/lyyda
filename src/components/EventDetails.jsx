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
import { useState } from 'react';

function EventDetails({ event }) {
  const [open, setOpen] = useState(false);

  return <Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger><Button variant="secondary" className="flex gap-2"><i className="fi fi-bs-eye"></i>Voir plus</Button></DrawerTrigger>
  <DrawerContent className="bg-slate-800 text-slate-200 border-slate-600">
    <DrawerHeader>
      <DrawerTitle>{event.title}</DrawerTitle>
      <DrawerDescription>{event.description}</DrawerDescription>
      <DrawerDescription><i className="fi fi-bs-map-marker-home"></i> {event.location}</DrawerDescription>
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