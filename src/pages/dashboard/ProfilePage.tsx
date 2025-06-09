
import { useState, useRef, ChangeEvent } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Mail, User, Pencil, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useProfile } from "@/hooks/useProfile";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { profileData, updateProfile, saveProfile, updateAvatar } = useProfile();

  const handleSaveProfile = () => {
    setIsEditing(false);
    saveProfile();
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
        updateAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
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
                                onClick={() => updateAvatar("")} 
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
                      <Label htmlFor="name" className="text-foreground">Nome</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => updateProfile({ name: e.target.value })}
                          className="pl-10 bg-background border-border text-foreground"
                          disabled={!isEditing}
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
                          value={profileData.email}
                          onChange={(e) => updateProfile({ email: e.target.value })}
                          className="pl-10 bg-background border-border text-foreground"
                          disabled={!isEditing}
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
                          value={profileData.phone}
                          onChange={(e) => updateProfile({ phone: e.target.value })}
                          className="pl-10 bg-background border-border text-foreground"
                          placeholder="(11) 99999-9999"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-foreground">Identidade de Gênero</Label>
                      <Select 
                        value={profileData.gender}
                        onValueChange={(value) => updateProfile({ gender: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="bg-background border-border text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          <SelectItem value="trans-woman" className="text-popover-foreground hover:bg-accent">Mulher Trans</SelectItem>
                          <SelectItem value="trans-man" className="text-popover-foreground hover:bg-accent">Homem Trans</SelectItem>
                          <SelectItem value="non-binary" className="text-popover-foreground hover:bg-accent">Não-binário</SelectItem>
                          <SelectItem value="other" className="text-popover-foreground hover:bg-accent">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="birthdate" className="text-foreground">Data de Nascimento</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="birthdate"
                          type="date"
                          value={profileData.birthdate}
                          onChange={(e) => updateProfile({ birthdate: e.target.value })}
                          className="pl-10 bg-background border-border text-foreground"
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
                    <Label className="text-foreground">Tipo de Terapia Atual</Label>
                    <Select 
                      value={profileData.gender === "trans-woman" ? "feminizante" : "masculinizante"} 
                      disabled
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="feminizante" className="text-popover-foreground hover:bg-accent">Terapia Feminizante</SelectItem>
                        <SelectItem value="masculinizante" className="text-popover-foreground hover:bg-accent">Terapia Masculinizante</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="text-foreground">Data de Início</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="start-date"
                        type="date"
                        value={profileData.startDate}
                        onChange={(e) => updateProfile({ startDate: e.target.value })}
                        className="pl-10 bg-background border-border text-foreground"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current-therapy" className="text-foreground">Medicamentos Atuais</Label>
                    <Input
                      id="current-therapy"
                      value={profileData.currentTherapy}
                      onChange={(e) => updateProfile({ currentTherapy: e.target.value })}
                      className="bg-background border-border text-foreground"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="font-medium mb-2 text-foreground">Progresso</h3>
                    <div className="flex items-center mb-4">
                      <div className="h-2 flex-grow bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "25%" }}></div>
                      </div>
                      <span className="ml-4 text-sm text-foreground">6 meses</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Você está no início da sua jornada. Continue acompanhando seu progresso regularmente.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Adicionar Registro de Progresso</Button>
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
                    <p className="text-foreground">Calendário em desenvolvimento</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Em breve você poderá gerenciar suas consultas e aplicações aqui
                    </p>
                    <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">Visualizar Agenda</Button>
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
