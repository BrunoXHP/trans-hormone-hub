
import { useState, useEffect } from 'react';

interface AgendaEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description?: string;
}

export const useAgenda = () => {
  const [events, setEvents] = useState<AgendaEvent[]>(() => {
    const saved = localStorage.getItem('agendaEvents');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('agendaEvents', JSON.stringify(events));
    console.log('Agenda events saved:', events);
  }, [events]);

  const addEvent = (event: Omit<AgendaEvent, 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const removeEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const getUpcomingEvents = (limit: number = 3) => {
    const now = new Date();
    return events
      .filter(event => new Date(event.date + 'T' + event.time) > now)
      .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime())
      .slice(0, limit);
  };

  return {
    events,
    addEvent,
    removeEvent,
    getUpcomingEvents,
  };
};
