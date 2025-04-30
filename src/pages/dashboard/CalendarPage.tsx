
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Tipos para os eventos da agenda
interface AppointmentEvent {
  id: string;
  title: string;
  date: Date;
  time?: string;
  type: "consulta" | "exame" | "medicação" | "outro";
  location?: string;
  notes?: string;
}

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<AppointmentEvent[]>([
    {
      id: "1",
      title: "Consulta Endocrinologista",
      date: new Date(2025, 4, 5),
      time: "14:30",
      type: "consulta",
      location: "Hospital Central - Sala 302",
      notes: "Levar exames recentes",
    },
    {
      id: "2",
      title: "Retirar medicação",
      date: new Date(2025, 4, 15),
      time: "10:00",
      type: "medicação",
      location: "Farmácia Popular",
    },
    {
      id: "3",
      title: "Exames de sangue",
      date: new Date(2025, 4, 20),
      time: "08:00",
      type: "exame",
      location: "Laboratório MedLife",
      notes: "Jejum de 12 horas",
    },
  ]);

  // Filtrar eventos pela data selecionada
  const selectedDateEvents = events.filter(
    (event) => date && event.date.toDateString() === date.toDateString()
  );

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Minha Agenda</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendário */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
              <CardDescription>Gerenciamento de consultas e lembretes</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar 
                mode="single" 
                selected={date} 
                onSelect={setDate} 
                locale={ptBR}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          {/* Eventos do dia */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {date ? format(date, "PPPP", { locale: ptBR }) : "Selecione uma data"}
                  </CardTitle>
                  <CardDescription>
                    {selectedDateEvents.length === 0
                      ? "Nenhum evento agendado para este dia"
                      : `${selectedDateEvents.length} evento(s) agendado(s)`}
                  </CardDescription>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <CalendarIcon className="h-4 w-4" /> Novo
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <div className="grid gap-4 p-4">
                      <div className="grid gap-2">
                        <h4 className="font-medium leading-none">Adicionar Evento</h4>
                        <p className="text-sm text-muted-foreground">
                          Funcionalidade em desenvolvimento
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-4 p-3 rounded-md border"
                    >
                      <div
                        className={cn(
                          "w-1.5 h-full rounded-full",
                          event.type === "consulta" && "bg-blue-500",
                          event.type === "exame" && "bg-green-500",
                          event.type === "medicação" && "bg-purple-500",
                          event.type === "outro" && "bg-gray-500"
                        )}
                      ></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{event.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {event.time}
                          </span>
                        </div>
                        {event.location && (
                          <p className="text-sm text-muted-foreground">
                            {event.location}
                          </p>
                        )}
                        {event.notes && (
                          <p className="text-sm mt-2 text-muted-foreground">
                            {event.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhum evento agendado para esta data
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Visão geral */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Visão Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="próximos">
                <TabsList className="mb-4">
                  <TabsTrigger value="próximos">Próximos eventos</TabsTrigger>
                  <TabsTrigger value="passados">Eventos passados</TabsTrigger>
                </TabsList>
                <TabsContent value="próximos" className="space-y-4">
                  {events
                    .filter((event) => event.date >= new Date())
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-4 p-3 rounded-md border"
                      >
                        <div className="w-16 h-16 rounded bg-primary/10 flex flex-col items-center justify-center">
                          <span className="text-sm font-medium">
                            {format(event.date, "MMM", { locale: ptBR })}
                          </span>
                          <span className="text-xl font-bold">
                            {format(event.date, "dd")}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{event.title}</h3>
                          <div className="flex gap-4 mt-1">
                            <span className="text-sm text-muted-foreground">
                              {event.time}
                            </span>
                            {event.location && (
                              <span className="text-sm text-muted-foreground">
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </TabsContent>
                <TabsContent value="passados">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Histórico de eventos em desenvolvimento
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
