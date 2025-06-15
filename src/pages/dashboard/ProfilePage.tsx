
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const FIELD_TO_LABEL: Record<string, string> = {
  name: "name",
  email: "email",
  gender: "gender",
  birthdate: "birthdate",
  phone: "phone",
  startDate: "startDate",
  currentTherapy: "currentTherapy",
  avatar: "avatar",
};

const ProfilePage = () => {
  const { profileData, updateProfile, saveProfile, updateAvatar } = useProfile();
  const location = useLocation();

  // Refs de campos para rolagem automática
  const refs: Record<string, React.RefObject<HTMLInputElement | HTMLSelectElement>> = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    gender: useRef<HTMLButtonElement>(null),
    birthdate: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    startDate: useRef<HTMLInputElement>(null),
    currentTherapy: useRef<HTMLButtonElement>(null),
    avatar: useRef<HTMLDivElement>(null),
  };

  // Detecta search param "focus" e rola até o campo
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const focus = params.get("focus");
    if (focus && refs[focus]) {
      setTimeout(() => {
        const node = refs[focus]?.current;
        if (node) {
          node.scrollIntoView({ behavior: "smooth", block: "center" });
          // Para dar realce visual
          node.classList.add("ring-2", "ring-primary");
          setTimeout(() => node.classList.remove("ring-2", "ring-primary"), 2200);
          if ("focus" in node) (node as HTMLElement).focus();
        }
      }, 280); // Para garantir que o layout foi montado
    }
  }, [location.search]);

  const handleInputChange = (field: string, value: string) => {
    updateProfile({ [field]: value });
  };

  const handleSave = () => {
    saveProfile();
  };

  const handleAvatarClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          updateAvatar(result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e preferências.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações Pessoais com Avatar */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar dentro das informações pessoais */}
                <div className="flex flex-col items-center pb-2" ref={refs.avatar}>
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileData.avatar} />
                      <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                        {profileData.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                      onClick={handleAvatarClick}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Clique no ícone da câmera para alterar sua foto
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Nome Completo</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Seu nome completo"
                      className="text-foreground"
                      ref={refs.name}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      className="text-foreground"
                      ref={refs.email}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-foreground">Identidade de Gênero</Label>
                    <Select value={profileData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className="text-foreground" ref={refs.gender}>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mulher-trans">Mulher Trans</SelectItem>
                        <SelectItem value="homem-trans">Homem Trans</SelectItem>
                        <SelectItem value="nao-binario">Não-binário</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="birthdate" className="text-foreground">Data de Nascimento</Label>
                    <Input
                      id="birthdate"
                      type="date"
                      value={profileData.birthdate}
                      onChange={(e) => handleInputChange('birthdate', e.target.value)}
                      className="text-foreground"
                      ref={refs.birthdate}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="text-foreground"
                    ref={refs.phone}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Informações da Terapia */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Informações da Terapia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-foreground">Data de Início da TH</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={profileData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="text-foreground"
                      ref={refs.startDate}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentTherapy" className="text-foreground">Terapia Atual</Label>
                    <Select value={profileData.currentTherapy} onValueChange={(value) => handleInputChange('currentTherapy', value)}>
                      <SelectTrigger className="text-foreground" ref={refs.currentTherapy}>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="estrogeno">Estrogênio</SelectItem>
                        <SelectItem value="testosterona">Testosterona</SelectItem>
                        <SelectItem value="bloqueadores">Bloqueadores</SelectItem>
                        <SelectItem value="combinada">Terapia Combinada</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Salvar Alterações
              </Button>
            </div>
          </div>
          {/* Removido o Card extra da foto do perfil */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
