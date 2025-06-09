
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Plus } from "lucide-react";
import { useAgenda } from "@/hooks/useAgenda";
import { useToast } from "@/hooks/use-toast";

const AddAgendaEventModal = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const { addEvent } = useAgenda();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !date || !time) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    addEvent({
      title,
      date,
      time,
      description,
    });

    toast({
      title: "Evento adicionado",
      description: "Seu evento foi adicionado à agenda com sucesso.",
    });

    // Reset form
    setTitle("");
    setDate("");
    setTime("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Evento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Calendar className="h-5 w-5" />
            Adicionar Evento à Agenda
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">Título *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Consulta médica"
              required
              className="text-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date" className="text-foreground">Data *</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="text-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time" className="text-foreground">Hora *</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="text-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes adicionais sobre o evento..."
              className="text-foreground"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Adicionar Evento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAgendaEventModal;
