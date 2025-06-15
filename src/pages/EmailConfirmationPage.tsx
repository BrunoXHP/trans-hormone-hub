
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { supabase } from "@/integrations/supabase/client";

const EmailConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');
        
        if (!token_hash || !type) {
          setStatus('error');
          setMessage('Link de confirmação inválido ou expirado.');
          return;
        }

        console.log('Processing email confirmation...', { token_hash, type });

        const { data, error } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as any
        });

        if (error) {
          console.error('Email confirmation error:', error);
          setStatus('error');
          setMessage('Erro ao confirmar email. O link pode estar expirado ou inválido.');
        } else if (data) {
          console.log('Email confirmed successfully:', data);
          setStatus('success');
          setMessage('Email confirmado com sucesso! Agora você pode fazer login.');
        }
      } catch (error) {
        console.error('Unexpected error during email confirmation:', error);
        setStatus('error');
        setMessage('Ocorreu um erro inesperado. Tente novamente.');
      }
    };

    handleEmailConfirmation();
  }, [searchParams]);

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <PageLayout>
      <div className="flex justify-center items-center min-h-[80vh] py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl gradient-text">
              Confirmação de Email
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {status === 'loading' && (
              <>
                <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground">
                  Confirmando seu email...
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-600">
                    Email Confirmado!
                  </h3>
                  <p className="text-muted-foreground">
                    {message}
                  </p>
                </div>
                <Button onClick={handleGoToLogin} className="w-full">
                  Ir para Login
                </Button>
              </>
            )}

            {status === 'error' && (
              <>
                <XCircle className="h-16 w-16 mx-auto text-red-500" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-red-600">
                    Erro na Confirmação
                  </h3>
                  <p className="text-muted-foreground">
                    {message}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleGoHome} variant="outline" className="flex-1">
                    Voltar ao Início
                  </Button>
                  <Button onClick={handleGoToLogin} className="flex-1">
                    Ir para Login
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default EmailConfirmationPage;
