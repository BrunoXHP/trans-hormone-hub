import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, User } from "lucide-react";
import AgendaSection from "@/components/dashboard/AgendaSection";
import AddAgendaEventModal from "@/components/modals/AddAgendaEventModal";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { calculateProfileCompletion } from "@/utils/profileCompletion";

const DashboardHome = () => {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  // Calcula os dias de jornada baseado em created_at do perfil
  const daysSinceStart = useMemo(() => {
    if (!profile?.created_at) return 0;
    const createdAtDate = new Date(profile.created_at);
    const now = new Date();
    createdAtDate.setHours(0,0,0,0);
    now.setHours(0,0,0,0);
    const diffTime = now.getTime() - createdAtDate.getTime();
    return Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1);
  }, [profile?.created_at]);

  // Perfil completo: calcula progresso e campo faltante
  const { percent, missing, firstMissingKey } = useMemo(() => {
    if (!profile) return { percent: 0, missing: [], firstMissingKey: undefined };
    return calculateProfileCompletion({
      name: profile.name,
      email: profile.email,
      gender: profile.gender,
      birthdate: profile.birth_date || "",
      phone: profile.phone || "",
      startDate: "", // Será preenchido só na profileData do perfil (deixar vazio: não computa aqui)
      currentTherapy: "",
      avatar: "",
    });
  }, [profile]);

  // UI handlers
  const handleGoToProfile = () => {
    if (!firstMissingKey) return;
    navigate(`/dashboard/profile?focus=${firstMissingKey}`);
  };

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

          <Card
            className={percent < 100 ? "cursor-pointer hover:shadow-lg ring-2 ring-primary/20 transition-shadow" : ""}
            onClick={percent < 100 && firstMissingKey ? handleGoToProfile : undefined}
            tabIndex={percent < 100 ? 0 : -1}
            role={percent < 100 ? "button" : undefined}
            title={percent < 100 ? "Clique para completar seu perfil" : ""}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Perfil Completo
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground">{percent}%</span>
                <div className="w-full">
                  <div className="h-2 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary transition-all"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              {percent < 100 ? (
                <p className="mt-2 text-xs text-destructive font-medium">
                  {missing.length === 1
                    ? "Complete seu perfil — falta um campo"
                    : `Complete seu perfil — faltam ${missing.length} campos`}
                </p>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">
                  Parabéns! Seu perfil está completo 🎉
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        <AgendaSection />
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
