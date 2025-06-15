
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormItem, FormControl, FormLabel, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PageLayout from "@/components/layout/PageLayout";

const formSchema = z
  .object({
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string(),
    token: z.string().min(8, "Token inválido"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<null | string>(null);
  const { validateToken, resetPassword, loading } = usePasswordReset();
  const tokenQuery = searchParams.get("token") || "";
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: tokenQuery,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus(null);

    // Valida o token
    const tokenValidation = await validateToken(data.token);
    if (!tokenValidation.valid) {
      setStatus(tokenValidation.reason);
      toast.error(tokenValidation.reason);
      return;
    }

    // Tenta realizar a redefinição (de fato só marca como usado, pois não temos permissões admin via frontend)
    const res = await resetPassword({ token: data.token, newPassword: data.password });

    if (res.success) {
      toast.success("Senha redefinida com sucesso! Agora faça login.");
      navigate("/login");
    } else {
      setStatus(res.message);
      toast.error(res.message);
    }
  };

  return (
    <PageLayout>
      <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Redefinir Senha
            </CardTitle>
            <CardDescription className="text-center">
              Insira o token recebido e sua nova senha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token de Recuperação</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Cole o token recebido" disabled={!!tokenQuery || loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova Senha</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirme a Nova Senha</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {status && (
                  <div className="text-red-500 text-sm text-center">{status}</div>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Redefinindo..." : "Redefinir Senha"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 items-center">
            <div className="text-center text-sm">
              <a href="/login" className="text-primary hover:underline">
                Voltar para o login
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ResetPasswordPage;
