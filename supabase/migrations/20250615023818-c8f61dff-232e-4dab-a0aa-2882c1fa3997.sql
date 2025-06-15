
-- Cria tabela para tokens de recuperação de senha
CREATE TABLE public.password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS para garantir que só o usuário tenha acesso
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuário pode inserir reset" 
  ON public.password_reset_tokens 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuário pode ver/homologar seu próprio reset" 
  ON public.password_reset_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuário pode atualizar usado" 
  ON public.password_reset_tokens
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- (opcional) GCs podem deletar tokens; usuário só pode deletar os seus
CREATE POLICY "Usuário pode remover seus próprios reset tokens" 
  ON public.password_reset_tokens
  FOR DELETE USING (auth.uid() = user_id);
