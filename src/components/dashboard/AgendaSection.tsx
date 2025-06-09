
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trash2 } from "lucide-react";
import { useAgenda } from "@/hooks/useAgenda";

const AgendaSection = () => {
  const { getUpcomingEvents, removeEvent } = useAgenda();
  const upcomingEvents = getUpcomingEvents();

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

  if (upcomingEvents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Calendar className="h-5 w-5" />
            Próximos Eventos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Nenhum evento agendado.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calendar className="h-5 w-5" />
          Próximos Eventos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{event.title}</h4>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(event.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(event.time)}
                </span>
              </div>
              {event.description && (
                <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEvent(event.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AgendaSection;
