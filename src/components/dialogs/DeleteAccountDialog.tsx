
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface DeleteAccountDialogProps {
  children: React.ReactNode;
}

const DeleteAccountDialog = ({ children }: DeleteAccountDialogProps) => {
  const [feedback, setFeedback] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    
    // Simulate account deletion process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save feedback if provided
    if (feedback.trim()) {
      localStorage.setItem('accountDeletionFeedback', feedback);
      console.log('Feedback saved:', feedback);
    }
    
    toast({
      title: "Conta excluída",
      description: "Sua conta foi excluída com sucesso. Obrigado pelo feedback.",
      variant: "destructive",
    });
    
    setIsDeleting(false);
    setFeedback("");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Excluir conta permanentemente
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente 
            excluídos dos nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="feedback">
              Feedback (opcional)
            </Label>
            <Textarea
              id="feedback"
              placeholder="Conte-nos o que podemos melhorar para tornar sua experiência melhor..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              Seu feedback nos ajuda a melhorar a plataforma para outros usuários.
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Excluindo..." : "Excluir conta"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountDialog;
