import React from 'react';
import { Calendar as CalendarPrimitive } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card } from '@/components/ui/card';

interface CalendarProps {
  events: Array<{
    date: Date;
    title: string;
    type: 'deadline' | 'hearing';
  }>;
  onDateSelect?: (date: Date) => void;
}

const Calendar = ({ events, onDateSelect }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect?.(date);
    }
  };

  return (
    <Card className="p-4">
      <CalendarPrimitive
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        locale={ptBR}
        modifiers={{
          hasEvent: (date) =>
            events.some(
              (event) =>
                format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
            ),
        }}
        modifiersClassNames={{
          hasEvent: 'bg-primary/10 font-bold',
        }}
        className="rounded-md"
      />
    </Card>
  );
};

export default Calendar;
