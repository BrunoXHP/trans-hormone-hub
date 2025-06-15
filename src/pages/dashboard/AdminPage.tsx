
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { useUserRoles } from "@/hooks/useUserRoles";
import { Card } from "@/components/ui/card";

const AdminPage = () => {
  const { loading: authLoading } = useAuth();
  const { hasRole, loading: rolesLoading } = useUserRoles();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !rolesLoading && !hasRole("admin")) {
      navigate("/dashboard");
    }
  }, [authLoading, rolesLoading, hasRole, navigate]);

  // Skeleton loading
  if (authLoading || rolesLoading) {
    return <DashboardLayout><div className="p-8">Carregando...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto mt-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Área do Administrador</h1>
          <ul className="space-y-2">
            <li>
              <a href="/dashboard/admin/events" className="font-medium text-primary hover:underline">
                Gerenciar eventos comunitários
              </a>
            </li>
            <li>
              <a href="/dashboard/admin/groups" className="font-medium text-primary hover:underline">
                Gerenciar grupos comunitários
              </a>
            </li>
            <li>
              <a href="/dashboard/admin/users" className="font-medium text-primary hover:underline">
                Gerenciar usuários e permissões
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminPage;
