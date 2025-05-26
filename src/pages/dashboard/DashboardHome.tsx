
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Search, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  console.log("DashboardHome component is rendering");
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bem-vindo(a) ao seu espaço</h1>
          <p className="text-muted-foreground">
            Veja suas informações personalizadas e gerencie sua jornada hormonal
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Próximas Aplicações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-3 py-1">
                  <p className="font-medium">Aplicação Hormonal</p>
                  <p className="text-sm text-muted-foreground">18 de Maio, 10:00</p>
                </div>
                <div className="border-l-4 border-muted pl-3 py-1">
                  <p className="font-medium">Consulta - Endocrinologista</p>
                  <p className="text-sm text-muted-foreground">23 de Maio, 15:30</p>
                </div>
                <Link to="/dashboard/calendar">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Ver Agenda Completa
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Seu Perfil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Terapia Atual</p>
                  <p className="font-medium">Terapia Hormonal Feminizante</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tempo de TH</p>
                  <p className="font-medium">6 meses</p>
                </div>
                <Link to="/dashboard/profile">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Editar Perfil
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Informações Recomendadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link to="/dashboard/info" className="block hover:bg-accent rounded p-2 -mx-2 transition-colors">
                  <p className="font-medium">Mudanças aos 6 meses de TH</p>
                  <p className="text-sm text-muted-foreground">O que esperar no seu estágio atual</p>
                </Link>
                <Link to="/dashboard/info" className="block hover:bg-accent rounded p-2 -mx-2 transition-colors">
                  <p className="font-medium">Dicas para aplicação segura</p>
                  <p className="text-sm text-muted-foreground">Guia passo a passo</p>
                </Link>
                <Link to="/dashboard/info">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Ver Mais Informações
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Seu Progresso</CardTitle>
              <CardDescription>
                Acompanhe sua jornada hormonal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 px-4 bg-accent/50 rounded-md">
                <p className="text-muted-foreground">
                  Acompanhe seu progresso adicionando fotos e registros.
                </p>
                <Button className="mt-4">
                  Adicionar Registro
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>
                Personalize sua experiência
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link to="/dashboard/settings" className="flex items-center gap-2 hover:bg-accent rounded p-2 -mx-2 transition-colors">
                  <Settings className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Notificações</p>
                    <p className="text-sm text-muted-foreground">Gerencie lembretes e alertas</p>
                  </div>
                </Link>
                <Link to="/dashboard/settings" className="flex items-center gap-2 hover:bg-accent rounded p-2 -mx-2 transition-colors">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Dados Pessoais</p>
                    <p className="text-sm text-muted-foreground">Atualize suas informações</p>
                  </div>
                </Link>
                <Link to="/dashboard/settings">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Todas as Configurações
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
