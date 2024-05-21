import { setHours, setMinutes } from 'date-fns';
import { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

function TimePicker({ selectedTime, onTimeChange }) {
    const [time, setTime] = useState(
        selectedTime || setHours(setMinutes(new Date(), 0), 12)
    );
    const [inputValue, setInputValue] = useState(format(time, 'HH:mm'));

    useEffect(() => {
        setInputValue(format(selectedTime || new Date(), 'HH:mm'));
    }, [selectedTime]);

    const handleTimeChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    
        if (/^\d{2}:\d{2}$/.test(value)) {
          const [hours, minutes] = value.split(':').map(Number);
          const newTime = setHours(setMinutes(new Date(), minutes), hours);
          setTime(newTime);
          onTimeChange(newTime);
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
            <Button variant={"outline"} className="flex justify-start items-center gap-2">
                <Clock />
                {format(time, 'HH:mm')}
            </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Input type="time" value={inputValue} onChange={handleTimeChange} />
            </PopoverContent>
        </Popover>
    )
}

export default TimePicker;