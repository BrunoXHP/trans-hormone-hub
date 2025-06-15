import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { useSettings } from "@/hooks/useSettings";
import DeleteAccountDialog from "@/components/dialogs/DeleteAccountDialog";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
const SettingsPage = () => {
  const {
    theme,
    setTheme
  } = useTheme();
  const {
    notifications,
    privacySettings,
    toggleNotification,
    togglePrivacy
  } = useSettings();
  const {
    signOut
  } = useAuth();
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };
  return <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Configurações</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <Switch id="email-notifications" checked={notifications.email} onCheckedChange={() => toggleNotification("email")} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações por SMS
                    </p>
                  </div>
                  <Switch id="sms-notifications" checked={notifications.sms} onCheckedChange={() => toggleNotification("sms")} />
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
                  <Switch id="appointment-reminders" checked={notifications.appointments} onCheckedChange={() => toggleNotification("appointments")} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="medication-reminders">Lembretes</Label>
                    <p className="text-sm text-muted-foreground">
                      Lembretes de medicação e tratamentos
                    </p>
                  </div>
                  <Switch id="medication-reminders" checked={notifications.reminders} onCheckedChange={() => toggleNotification("reminders")} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-updates">Atualizações</Label>
                    <p className="text-sm text-muted-foreground">
                      Informações e atualizações do sistema
                    </p>
                  </div>
                  <Switch id="system-updates" checked={notifications.updates} onCheckedChange={() => toggleNotification("updates")} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Privacy & Theme */}
          <Card className="md:col-span-3 lg:col-span-1">
            <CardHeader>
              <CardTitle>Tema</CardTitle>
              <CardDescription>Configure sua preferência de aparência</CardDescription>
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
                  <Switch id="data-sharing" checked={privacySettings.shareData} onCheckedChange={() => togglePrivacy("shareData")} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="research">Pesquisas</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir uso de dados para pesquisas acadêmicas
                    </p>
                  </div>
                  <Switch id="research" checked={privacySettings.allowResearch} onCheckedChange={() => togglePrivacy("allowResearch")} />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Tema</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant={theme === "light" ? "default" : "outline"} className="w-full" onClick={() => handleThemeChange("light")}>
                    Claro
                  </Button>
                  <Button variant={theme === "dark" ? "default" : "outline"} className="w-full" onClick={() => handleThemeChange("dark")}>
                    Escuro
                  </Button>
                  <Button variant={theme === "system" ? "default" : "outline"} className="w-full" onClick={() => handleThemeChange("system")}>
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
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Excluir conta</h3>
                  <p className="text-sm text-muted-foreground">
                    Esta ação não pode ser desfeita. Todos seus dados serão permanentemente excluídos.
                  </p>
                </div>
                <DeleteAccountDialog>
                  <Button variant="destructive">Excluir</Button>
                </DeleteAccountDialog>
              </div>
              {/* Botão de logout colocado na zona de perigo */}
              <div className="flex items-center justify-between mt-4">
                <div>
                  <h3 className="font-medium">Sair da conta</h3>
                  <p className="text-sm text-muted-foreground">
                    Clique abaixo para sair da sua conta com segurança.
                  </p>
                </div>
                <Button variant="outline" className="text-destructive border-destructive" onClick={signOut} title="Sair da conta">
                  <LogOut size={18} className="mr-2" />
                  Sair
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>;
};
export default SettingsPage;