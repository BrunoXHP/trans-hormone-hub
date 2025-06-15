
-- 1. Cria um enum para as roles necessárias
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Cria a tabela que associa usuários às roles
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 3. Ativa RLS e permite apenas o próprio usuário visualizar sua role
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuário pode ver seu próprio papel (role)" 
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- 4. Função para verificar se usuário tem uma role específica
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$$;

-- 5. Permite que apenas um admin possa inserir/atualizar/deletar roles
CREATE POLICY "Apenas admin pode gerenciar roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
