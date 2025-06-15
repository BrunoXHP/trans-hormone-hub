import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { usePasswordReset } from "@/hooks/usePasswordReset";

const formSchema = z.object({
  email: z.string().email("Digite um email válido"),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { requestReset, loading } = usePasswordReset();

  const onSubmit = async (data: FormValues) => {
    // Chama a função que solicita o reset de senha
    const result = await requestReset(data.email);

    if (result.success && result.token) {
      // Exibe o token em um toast para demo. No futuro, um email será enviado.
      toast.success("Token de teste (demo): " + result.token, {
        description: "No futuro, você receberá instruções por email.",
        duration: 20000,
      });
      console.log("Reset Token gerado para o email:", data.email, "Token:", result.token);
    }
  };

  return (
    <PageLayout>
      <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Recuperação de Senha
            </CardTitle>
            <CardDescription className="text-center">
              Digite seu email para receber as instruções de recuperação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="seu.email@exemplo.com"
                            className="pl-10"
                            {...field}
                            disabled={loading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar Instruções"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 items-center">
            <div className="text-center text-sm">
              <Link to="/login" className="text-primary hover:underline">
                Voltar para o login
              </Link>
            </div>
            <div className="text-xs text-muted-foreground">
              Já tem um token?{" "}
              <Link to="/reset-password" className="text-primary hover:underline">
                Redefinir senha
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ForgotPasswordPage;
