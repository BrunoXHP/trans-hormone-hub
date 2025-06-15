import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AgendaEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description?: string;
  user_id?: string;
}

export const useAgenda = () => {
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();

  // Buscar eventos do usuário logado
  const fetchEvents = async () => {
    if (!profile?.id) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('agenda_events')
        .select('*')
        .eq('user_id', profile.id)
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        toast({
          title: "Erro",
          description: "Erro ao carregar eventos da agenda.",
          variant: "destructive",
        });
        return;
      }

      setEvents(data || []);
      console.log('Events fetched:', data);
    } catch (error) {
      console.error('Unexpected error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar eventos quando o usuário estiver disponível
  useEffect(() => {
    if (profile?.id) {
      fetchEvents();
    }
  }, [profile?.id]);

  const addEvent = async (event: Omit<AgendaEvent, 'id' | 'user_id'>) => {
    if (!profile?.id) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('agenda_events')
        .insert([{
          ...event,
          user_id: profile.id,
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding event:', error);
        toast({
          title: "Erro",
          description: "Erro ao adicionar evento.",
          variant: "destructive",
        });
        return;
      }

      setEvents(prev => [...prev, data]);
      toast({
        title: "Sucesso",
        description: "Evento adicionado com sucesso!",
      });
      console.log('Event added:', data);
    } catch (error) {
      console.error('Unexpected error adding event:', error);
    }
  };

  const removeEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('agenda_events')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error removing event:', error);
        toast({
          title: "Erro",
          description: "Erro ao remover evento.",
          variant: "destructive",
        });
        return;
      }

      setEvents(prev => prev.filter(event => event.id !== id));
      toast({
        title: "Sucesso",
        description: "Evento removido com sucesso!",
      });
      console.log('Event removed:', id);
    } catch (error) {
      console.error('Unexpected error removing event:', error);
    }
  };

  // Mostra eventos de hoje em diante, incluindo aqueles criados ontem mas ainda são para hoje ou depois
  const getUpcomingEvents = (limit: number = 3) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Começo do dia de hoje

    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        // Inclui hoje e datas futuras
        return eventDate >= now;
      })
      .sort((a, b) => new Date(a.date + 'T' + (a.time || '00:00')).getTime() - new Date(b.date + 'T' + (b.time || '00:00')).getTime())
      .slice(0, limit);
  };

  // Novo: retorna todos os dias do mês que têm ao menos um evento
  const getEventDaysInMonth = (year: number, month: number) => {
    // month: 0-11 (como no JS Date)
    return events.reduce<number[]>((days, event) => {
      const d = new Date(event.date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!days.includes(day)) days.push(day);
      }
      return days;
    }, []);
  };

  const getPastEvents = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of today
    
    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate < now;
      })
      .sort((a, b) => new Date(b.date + 'T' + (b.time || '00:00')).getTime() - new Date(a.date + 'T' + (a.time || '00:00')).getTime());
  };

  return {
    events,
    loading,
    addEvent,
    removeEvent,
    getUpcomingEvents,
    getPastEvents,
    refetch: fetchEvents,
    getEventDaysInMonth,
  };
};
