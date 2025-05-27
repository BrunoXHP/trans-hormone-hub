
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Camera, FileText } from "lucide-react";

interface ProgressRecord {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "measurement" | "photo" | "feeling" | "milestone";
  value?: string;
}

interface AddProgressRecordModalProps {
  onAddRecord: (record: Omit<ProgressRecord, 'id'>) => void;
  children: React.ReactNode;
}

const AddProgressRecordModal = ({ onAddRecord, children }: AddProgressRecordModalProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"measurement" | "photo" | "feeling" | "milestone">("feeling");
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, adicione um título para seu registro.",
        variant: "destructive",
      });
      return;
    }

    const newRecord = {
      date,
      title: title.trim(),
      description: description.trim(),
      type,
      value: value.trim() || undefined,
    };

    onAddRecord(newRecord);
    
    // Reset form
    setTitle("");
    setDescription("");
    setValue("");
    setDate(new Date().toISOString().split('T')[0]);
    setType("feeling");
    setOpen(false);

    toast({
      title: "Registro adicionado!",
      description: "Seu progresso foi registrado com sucesso.",
    });
  };

  const getTypeIcon = (recordType: string) => {
    switch (recordType) {
      case "photo":
        return <Camera className="h-4 w-4" />;
      case "measurement":
        return <FileText className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Registro de Progresso</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Registro</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full p-2 border border-input rounded-md bg-background"
            >
              <option value="feeling">Como me sinto</option>
              <option value="milestone">Marco importante</option>
              <option value="measurement">Medição/Dados</option>
              <option value="photo">Registro fotográfico</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Primeiras mudanças visíveis"
              required
            />
          </div>

          {type === "measurement" && (
            <div className="space-y-2">
              <Label htmlFor="value">Valor/Medição</Label>
              <Input
                id="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ex: Peso: 65kg, Circunferência: 85cm"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva seu progresso, sentimentos ou observações..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Adicionar Registro
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProgressRecordModal;
