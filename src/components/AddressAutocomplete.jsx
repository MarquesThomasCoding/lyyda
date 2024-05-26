/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
//   CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from 'use-debounce';

const AddressAutocomplete = ({ location, setLocation }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [locationValue, setLocationValue] = useState('');
    const [open, setOpen] = useState(false);

    const handleInputChange = useDebouncedCallback(async (value) => {
        if (value === '') {
          setSuggestions([]);
          return;
        }
      
        try {
          const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
              q: value,
              format: 'json',
              addressdetails: 1,
              limit: 3,
            },
          });
          if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            setSuggestions(response.data);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des suggestions d\'adresse:', error);
          setSuggestions([]);
        }
      }, 300);      

  

  const handleSuggestionClick = (address) => {
    setLocation(address.display_name);
    setSuggestions([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {location ? location.substring(0, 30) + (location.length > 30 ? '...' : '') : "Choisissez le lieu..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
            <Input 
            value={locationValue} 
            onChange={(e) => {
                const newValue = e.target.value;
                setLocationValue(newValue);
                handleInputChange(newValue);
            }} 
            placeholder="Lieu de l'événement"
            />
          <CommandEmpty>Adresse introuvable</CommandEmpty>
          <CommandGroup>
            <CommandList>
            {suggestions && Array.isArray(suggestions) && suggestions.map((address) => (
                    <CommandItem
                        key={address.place_id}
                        value={address.display_name}
                        onSelect={() => {
                            handleSuggestionClick(address)
                            setOpen(false)
                        }}
                    >
                        <Check
                            className={cn(
                                "mr-2 h-4 w-4",
                                location === address.display_name ? "opacity-100" : "opacity-0"
                            )}
                        />
                        {address.display_name.substring(0, 50) + (address.display_name.length > 50 ? '...' : '')}
                    </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AddressAutocomplete;
