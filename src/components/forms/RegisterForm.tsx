
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User, Key, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [customGender, setCustomGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleGenderChange = (value: string) => {
    setGender(value);
    if (value !== "outro") {
      setCustomGender("");
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    if (!name || !email || !password || !gender || !birthDate) {
      toast({
        title: "Erro no cadastro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (gender === "outro" && !customGender.trim()) {
      toast({
        title: "Erro no cadastro",
        description: "Por favor, especifique sua identidade de gênero.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting to register user with:', { name, email, gender: gender === "outro" ? customGender : gender, birthDate });
      
      const finalGender = gender === "outro" ? customGender : gender;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            gender: finalGender,
            birth_date: birthDate,
          },
        },
      });

      if (error) {
        console.error('Registration error:', error);
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        console.log('User registered successfully:', data.user);
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Verifique seu email para confirmar a conta e depois faça login.",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error('Unexpected error during registration:', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">Nome</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="Seu nome"
            className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="birth-date" className="text-foreground">Data de Nascimento</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="birth-date"
            type="date"
            className="pl-10 bg-background border-border text-foreground"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="gender" className="text-foreground">Identidade de Gênero</Label>
        <Select value={gender} onValueChange={handleGenderChange} required>
          <SelectTrigger className="bg-background border-border text-foreground">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="mulher-trans" className="text-popover-foreground hover:bg-accent">Mulher Trans</SelectItem>
            <SelectItem value="homem-trans" className="text-popover-foreground hover:bg-accent">Homem Trans</SelectItem>
            <SelectItem value="nao-binario" className="text-popover-foreground hover:bg-accent">Não-binário</SelectItem>
            <SelectItem value="outro" className="text-popover-foreground hover:bg-accent">Outro</SelectItem>
          </SelectContent>
        </Select>
        
        {gender === "outro" && (
          <div className="mt-2">
            <Input
              type="text"
              placeholder="Especifique sua identidade de gênero"
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              value={customGender}
              onChange={(e) => setCustomGender(e.target.value)}
              required
            />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground">Senha</Label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            className="pl-10 bg-background border-border text-foreground"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-foreground">Confirmar Senha</Label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirm-password"
            type="password"
            className="pl-10 bg-background border-border text-foreground"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
            Cadastrando...
          </span>
        ) : (
          "Cadastrar"
        )}
      </Button>
      
      <div className="mt-4 text-center text-sm text-foreground">
        Já tem uma conta?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Faça login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
