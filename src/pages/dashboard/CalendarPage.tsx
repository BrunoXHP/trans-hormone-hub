
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, PlusCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/sonner";

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

// Schema para o formulário de adição de evento
const eventFormSchema = z.object({
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  date: z.date({ required_error: "A data é obrigatória" }),
  time: z.string().optional(),
  type: z.enum(["consulta", "exame", "medicação", "outro"]),
  location: z.string().optional(),
  notes: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
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

  // Configuração do formulário com React Hook Form
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      time: "",
      type: "outro",
      location: "",
      notes: "",
    },
  });

  // Função para tratar a submissão do formulário
  const onSubmit = (values: EventFormValues) => {
    // Criar novo evento
    const newEvent: AppointmentEvent = {
      id: crypto.randomUUID(),
      title: values.title,
      date: values.date,
      time: values.time,
      type: values.type,
      location: values.location,
      notes: values.notes,
    };

    // Adicionar o novo evento à lista
    setEvents([...events, newEvent]);
    
    // Fechar o diálogo e mostrar uma notificação de sucesso
    setIsAddEventOpen(false);
    form.reset();
    toast.success("Evento adicionado com sucesso!");
  };

  // Função para abrir o diálogo de adição de evento
  const openAddEventDialog = () => {
    form.reset({
      title: "",
      date: date || new Date(),
      time: "",
      type: "outro",
      location: "",
      notes: "",
    });
    setIsAddEventOpen(true);
  };

  // Filtrar eventos pela data selecionada
  const selectedDateEvents = events.filter(
    (event) => date && event.date.toDateString() === date.toDateString()
  );

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Minha Agenda</h1>
          <Button onClick={openAddEventDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Evento
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendário */}
          <Card className="md:col-span-1 h-fit">
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
              <CardDescription>Gerenciamento de consultas e lembretes</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar 
                mode="single" 
                selected={date} 
                onSelect={setDate} 
                locale={ptBR}
                className="rounded-md border mx-auto"
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
                <Button 
                  onClick={openAddEventDialog} 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                >
                  <CalendarIcon className="h-4 w-4" /> 
                  Novo
                </Button>
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
                  <Button 
                    className="mt-4" 
                    variant="outline" 
                    onClick={openAddEventDialog}
                  >
                    Adicionar evento
                  </Button>
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

      {/* Diálogo de adição de evento */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar novo evento</DialogTitle>
            <DialogDescription>
              Preencha os campos para criar um novo evento na sua agenda.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Consulta médica" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="consulta">Consulta</option>
                        <option value="exame">Exame</option>
                        <option value="medicação">Medicação</option>
                        <option value="outro">Outro</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Hospital Central" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Levar exames" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddEventOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Adicionar evento
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CalendarPage;
