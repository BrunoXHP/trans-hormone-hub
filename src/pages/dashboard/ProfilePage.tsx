import { useState, useRef, ChangeEvent } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Mail, User, Pencil } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ProfilePage = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState({
    name: "Ana Silva",
    email: "ana.silva@email.com",
    gender: "trans-woman",
    birthdate: "1990-05-15",
    startDate: "2022-11-10",
    currentTherapy: "Estradiol + Espironolactona",
    avatar: "",
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a URL for the selected image file
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProfileData({...profileData, avatar: reader.result});
      }
    };
    reader.readAsDataURL(file);

    // Show success toast
    toast({
      title: "Avatar atualizado",
      description: "Sua foto de perfil foi atualizada com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Seu Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e acompanhe sua jornada
          </p>
        </div>

        <Tabs defaultValue="personal">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
            <TabsTrigger value="therapy">Terapia Hormonal</TabsTrigger>
            <TabsTrigger value="calendar">Agenda</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Dados Pessoais</CardTitle>
                  <CardDescription>Suas informações básicas</CardDescription>
                </div>
                <Button 
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                >
                  {isEditing ? "Salvar" : "Editar"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative">
                      <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
                        {profileData.avatar ? (
                          <AvatarImage src={profileData.avatar} alt={profileData.name} />
                        ) : (
                          <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                            {profileData.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-52 p-2">
                          <div className="space-y-2">
                            <Button 
                              onClick={handleAvatarClick} 
                              variant="outline" 
                              className="w-full"
                            >
                              Escolher imagem
                            </Button>
                            {profileData.avatar && (
                              <Button 
                                onClick={() => setProfileData({...profileData, avatar: ""})} 
                                variant="outline" 
                                className="w-full"
                              >
                                Remover imagem
                              </Button>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*"
                        className="hidden" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Identidade de Gênero</Label>
                      <Select 
                        value={profileData.gender}
                        onValueChange={(value) => setProfileData({...profileData, gender: value})}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trans-woman">Mulher Trans</SelectItem>
                          <SelectItem value="trans-man">Homem Trans</SelectItem>
                          <SelectItem value="non-binary">Não-binário</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthdate">Data de Nascimento</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="birthdate"
                          type="date"
                          value={profileData.birthdate}
                          onChange={(e) => setProfileData({...profileData, birthdate: e.target.value})}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="therapy" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Terapia Hormonal</CardTitle>
                  <CardDescription>Informações sobre seu tratamento</CardDescription>
                </div>
                <Button 
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                >
                  {isEditing ? "Salvar" : "Editar"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Tipo de Terapia Atual</Label>
                    <Select 
                      value={profileData.gender === "trans-woman" ? "feminizante" : "masculinizante"} 
                      disabled
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feminizante">Terapia Feminizante</SelectItem>
                        <SelectItem value="masculinizante">Terapia Masculinizante</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="start-date">Data de Início</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="start-date"
                        type="date"
                        value={profileData.startDate}
                        onChange={(e) => setProfileData({...profileData, startDate: e.target.value})}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current-therapy">Medicamentos Atuais</Label>
                    <Input
                      id="current-therapy"
                      value={profileData.currentTherapy}
                      onChange={(e) => setProfileData({...profileData, currentTherapy: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Progresso</h3>
                    <div className="flex items-center mb-4">
                      <div className="h-2 flex-grow bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "25%" }}></div>
                      </div>
                      <span className="ml-4 text-sm">6 meses</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Você está no início da sua jornada. Continue acompanhando seu progresso regularmente.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full">Adicionar Registro de Progresso</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sua Agenda</CardTitle>
                <CardDescription>Consultas e aplicações agendadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-accent/50 text-center p-8 rounded-md">
                    <p>Calendário em desenvolvimento</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Em breve você poderá gerenciar suas consultas e aplicações aqui
                    </p>
                    <Button className="mt-4">Visualizar Agenda</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
