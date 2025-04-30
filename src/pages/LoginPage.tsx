
import PageLayout from "@/components/layout/PageLayout";
import LoginForm from "@/components/forms/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <PageLayout>
      <div className="flex justify-center items-center min-h-[80vh] py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl gradient-text">Bem-vindo de volta</CardTitle>
            <CardDescription>
              Entre na sua conta para acessar suas informações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
