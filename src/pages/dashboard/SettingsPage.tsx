
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    email: "usuario@exemplo.com",
    name: "Usuário Exemplo",
    phone: "(11) 98765-4321",
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    appointments: true,
    reminders: true,
    updates: false,
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    shareData: false,
    allowResearch: true,
    profileVisibility: "private",
  });

  // Theme setting
  const [theme, setTheme] = useState("system");

  const handleAccountSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Configurações salvas",
        description: "Suas configurações de conta foram atualizadas com sucesso.",
      });
    }, 1000);
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Preferências atualizadas",
      description: "Suas preferências de notificação foram salvas.",
    });
  };

  const handlePrivacyToggle = (key: keyof typeof privacySettings) => {
    if (typeof privacySettings[key] === "boolean") {
      setPrivacySettings(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
      
      toast({
        title: "Configurações de privacidade atualizadas",
        description: "Suas preferências de privacidade foram salvas.",
      });
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    
    toast({
      title: "Tema alterado",
      description: `O tema foi alterado para ${
        newTheme === "dark" ? "escuro" : newTheme === "light" ? "claro" : "sistema"
      }.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Configurações</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Account Settings */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Configurações de Conta</CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais e de contato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAccountSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input 
                      id="name" 
                      value={accountSettings.name} 
                      onChange={(e) => setAccountSettings({...accountSettings, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={accountSettings.email} 
                      onChange={(e) => setAccountSettings({...accountSettings, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone" 
                      value={accountSettings.phone} 
                      onChange={(e) => setAccountSettings({...accountSettings, phone: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Salvando..." : "Salvar alterações"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Notifications */}
          <Card className="md:col-span-3 lg:col-span-2">
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>
                Configure como e quando deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Canais de comunicação</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações por email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={() => handleNotificationToggle("email")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações por SMS
                    </p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notifications.sms}
                    onCheckedChange={() => handleNotificationToggle("sms")}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Tipos de notificação</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="appointment-reminders">Consultas</Label>
                    <p className="text-sm text-muted-foreground">
                      Lembretes de consultas e compromissos
                    </p>
                  </div>
                  <Switch
                    id="appointment-reminders"
                    checked={notifications.appointments}
                    onCheckedChange={() => handleNotificationToggle("appointments")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="medication-reminders">Lembretes</Label>
                    <p className="text-sm text-muted-foreground">
                      Lembretes de medicação e tratamentos
                    </p>
                  </div>
                  <Switch
                    id="medication-reminders"
                    checked={notifications.reminders}
                    onCheckedChange={() => handleNotificationToggle("reminders")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-updates">Atualizações</Label>
                    <p className="text-sm text-muted-foreground">
                      Informações e atualizações do sistema
                    </p>
                  </div>
                  <Switch
                    id="system-updates"
                    checked={notifications.updates}
                    onCheckedChange={() => handleNotificationToggle("updates")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Privacy & Theme */}
          <Card className="md:col-span-3 lg:col-span-1">
            <CardHeader>
              <CardTitle>Privacidade e Tema</CardTitle>
              <CardDescription>
                Configure suas preferências de privacidade e aparência
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Privacidade</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-sharing">Compartilhamento de dados</Label>
                    <p className="text-sm text-muted-foreground">
                      Compartilhar dados anônimos para melhorar o serviço
                    </p>
                  </div>
                  <Switch
                    id="data-sharing"
                    checked={privacySettings.shareData}
                    onCheckedChange={() => handlePrivacyToggle("shareData")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="research">Pesquisas</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir uso de dados para pesquisas acadêmicas
                    </p>
                  </div>
                  <Switch
                    id="research"
                    checked={privacySettings.allowResearch}
                    onCheckedChange={() => handlePrivacyToggle("allowResearch")}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Tema</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={theme === "light" ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => handleThemeChange("light")}
                  >
                    Claro
                  </Button>
                  <Button 
                    variant={theme === "dark" ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => handleThemeChange("dark")}
                  >
                    Escuro
                  </Button>
                  <Button 
                    variant={theme === "system" ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => handleThemeChange("system")}
                  >
                    Sistema
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar</Button>
            </CardFooter>
          </Card>
          
          {/* Danger Zone */}
          <Card className="md:col-span-3 border-destructive/50">
            <CardHeader className="text-destructive">
              <CardTitle>Zona de Perigo</CardTitle>
              <CardDescription>
                Ações irreversíveis para sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Excluir conta</h3>
                  <p className="text-sm text-muted-foreground">
                    Esta ação não pode ser desfeita. Todos seus dados serão permanentemente excluídos.
                  </p>
                </div>
                <Button variant="destructive">Excluir</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
