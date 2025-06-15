
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trash2, Loader2, Plus } from "lucide-react";
import { useAgenda } from "@/hooks/useAgenda";
import AddAgendaEventModal from "@/components/modals/AddAgendaEventModal";
import { useState } from "react";

const AgendaSection = () => {
  const { getUpcomingEvents, removeEvent, loading, events, getEventDaysInMonth } = useAgenda();
  const upcomingEvents = getUpcomingEvents();

  // Marcador de dias com eventos
  const today = new Date();
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const eventDays = getEventDaysInMonth(calendarYear, calendarMonth);

  // Gera uma mini "agenda/calendário" do mês com marcadores
  const renderCalendarMarkers = () => {
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    return (
      <div className="grid grid-cols-7 gap-1 mb-4">
        {Array.from({ length: daysInMonth }, (_, idx) => {
          const day = idx + 1;
          const hasEvent = eventDays.includes(day);
          const isToday =
            day === today.getDate() &&
            calendarMonth === today.getMonth() &&
            calendarYear === today.getFullYear();
          return (
            <div
              key={day}
              className={`rounded-full text-center text-xs font-medium w-8 h-8 leading-8 ${
                isToday
                  ? "bg-primary/90 text-white border border-primary"
                  : hasEvent
                  ? "bg-primary/30 text-primary"
                  : "text-muted-foreground"
              } ${hasEvent ? "ring-2 ring-primary" : ""}`}
              title={hasEvent ? "Dia com evento" : undefined}
            >
              {day}
            </div>
          );
        })}
      </div>
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return time;
  };

  const handleRemoveEvent = async (eventId: string) => {
    if (window.confirm('Tem certeza que deseja remover este evento?')) {
      await removeEvent(eventId);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Calendar className="h-5 w-5" />
            Próximos Eventos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Carregando eventos...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calendar className="h-5 w-5" />
          Próximos Eventos
        </CardTitle>
        <AddAgendaEventModal />
      </CardHeader>
      <CardContent>
        {renderCalendarMarkers()}
        <div className="space-y-4 mt-2">
          {upcomingEvents.length === 0 ? (
            <p className="text-muted-foreground">Nenhum evento agendado.</p>
          ) : (
            upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{event.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(event.date)}
                    </span>
                    {event.time && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(event.time)}
                      </span>
                    )}
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveEvent(event.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgendaSection;
