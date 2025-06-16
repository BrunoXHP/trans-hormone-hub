
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, User, TrendingUp } from "lucide-react";
import AgendaSection from "@/components/dashboard/AgendaSection";
import AddAgendaEventModal from "@/components/modals/AddAgendaEventModal";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";

const DashboardHome = () => {
  const { profile, loading } = useAuth();

  // Calcula os dias de jornada baseado em created_at do perfil
  const daysSinceStart = useMemo(() => {
    if (!profile?.created_at) return 0;
    const createdAtDate = new Date(profile.created_at);
    const now = new Date();
    // Zera as horas para consistência da contagem
    createdAtDate.setHours(0,0,0,0);
    now.setHours(0,0,0,0);
    const diffTime = now.getTime() - createdAtDate.getTime();
    return Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1);
  }, [profile?.created_at]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Acompanhe seu progresso e gerencie sua jornada.
            </p>
          </div>
          <AddAgendaEventModal />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Dias de Jornada
              </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {loading ? "..." : daysSinceStart}
              </div>
              <p className="text-xs text-muted-foreground">
                Desde a criação da sua conta
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Próximas Consultas
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3</div>
              <p className="text-xs text-muted-foreground">
                Este mês
              </p>
            </CardContent>
          </Card>
          
          {/* Card de Registro de Progresso REMOVIDO */}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Perfil Completo
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">85%</div>
              <p className="text-xs text-muted-foreground">
                Faltam alguns dados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Agenda Section */}
        <AgendaSection />

        {/* Seções de Ações Rápidas e Próximos Marcos removidas! */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Próximos Marcos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-foreground">
                  6 meses de terapia hormonal em 3 dias
                </div>
                <div className="text-sm text-muted-foreground">
                  Continue acompanhando seu progresso!
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;

