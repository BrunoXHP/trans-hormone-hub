
import PageLayout from "@/components/layout/PageLayout";
import RegisterForm from "@/components/forms/RegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <PageLayout>
      <div className="flex justify-center items-center min-h-[80vh] py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl gradient-text">Criar uma Conta</CardTitle>
            <CardDescription>
              Cadastre-se para acessar recursos personalizados para sua jornada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
