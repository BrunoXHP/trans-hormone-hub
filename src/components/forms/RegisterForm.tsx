import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Key, User, Calendar, Phone, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [customGender, setCustomGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (gender === "other" && !customGender.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, especifique sua identidade de gênero.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const finalGender = gender === "other" ? customGender : gender;
      
      console.log('Tentando cadastrar usuário com dados:', {
        email,
        name,
        gender: finalGender,
        birth_date: birthDate,
        phone
      });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            gender: finalGender,
            birth_date: birthDate,
            phone
          },
          emailRedirectTo: `${window.location.origin}/email-confirmation`
        }
      });

      if (error) {
        console.error('Registration error:', error);
        
        if (error.message.includes('User already registered')) {
          toast({
            title: "Usuário já cadastrado",
            description: "Este email já está em uso. Tente fazer login ou use outro email.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro no cadastro",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      console.log('Usuário criado com sucesso:', data);

      if (data.user) {
        // Aguardar um pouco para o trigger executar
        setTimeout(async () => {
          // Verificar se o perfil foi criado
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();
            
          console.log('Verificação do perfil:', { profileData, profileError });
          
          if (!profileData && !profileError) {
            console.log('Perfil não foi criado pelo trigger, criando manualmente...');
            // Se o perfil não foi criado pelo trigger, criar manualmente
            const { error: manualProfileError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                name,
                email,
                gender: finalGender,
                birth_date: birthDate || null,
                phone: phone || null
              });
              
            if (manualProfileError) {
              console.error('Erro ao criar perfil manualmente:', manualProfileError);
            } else {
              console.log('Perfil criado manualmente com sucesso');
            }
          }
        }, 2000);
        
        if (!data.user.email_confirmed_at) {
          toast({
            title: "Cadastro realizado com sucesso!",
            description: "Verifique seu email para ativar sua conta. Em seguida, faça login.",
          });
        } else {
          toast({
            title: "Cadastro realizado com sucesso!",
            description: "Sua conta foi criada. Agora você pode fazer login.",
          });
        }
        
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
            placeholder="Seu nome completo"
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
        <Label htmlFor="phone" className="text-foreground">Telefone</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="(11) 99999-9999"
            className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender" className="text-foreground">Identidade de Gênero</Label>
        <Select value={gender} onValueChange={setGender} required>
          <SelectTrigger className="bg-background border-border text-foreground">
            <SelectValue placeholder="Selecione sua identidade" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="trans-woman" className="text-popover-foreground hover:bg-accent">Mulher Trans</SelectItem>
            <SelectItem value="trans-man" className="text-popover-foreground hover:bg-accent">Homem Trans</SelectItem>
            <SelectItem value="non-binary" className="text-popover-foreground hover:bg-accent">Não-binário</SelectItem>
            <SelectItem value="other" className="text-popover-foreground hover:bg-accent">Outro</SelectItem>
          </SelectContent>
        </Select>
        
        {gender === "other" && (
          <div className="mt-2">
            <Input
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
        <Label htmlFor="birthDate" className="text-foreground">Data de Nascimento</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="birthDate"
            type="date"
            className="pl-10 bg-background border-border text-foreground"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground">Senha</Label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            className="pl-10 pr-10 bg-background border-border text-foreground"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-foreground">Confirmar Senha</Label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className="pl-10 pr-10 bg-background border-border text-foreground"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
            Criando conta...
          </span>
        ) : (
          "Criar Conta"
        )}
      </Button>

      <div className="text-center text-sm text-foreground">
        Já tem uma conta?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Faça login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
