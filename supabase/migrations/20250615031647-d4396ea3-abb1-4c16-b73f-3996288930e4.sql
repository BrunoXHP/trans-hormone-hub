
-- Cria a tabela de eventos comunitários
CREATE TABLE public.community_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date NOT NULL,
  time text,
  description text,
  location text,
  organizer text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Ativa Row Level Security
ALTER TABLE public.community_events ENABLE ROW LEVEL SECURITY;

-- Permite usuários autenticados visualizarem eventos comunitários
CREATE POLICY "Authenticated users can view community events"
  ON public.community_events
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- (Opcional para administradores: ajuste conforme necessidade)
-- Permite apenas administradores inserirem/alterarem/removerem eventos comunitários
-- Aqui apenas como exemplo, ajuste depois conforme o sistema de roles da equipe
CREATE POLICY "Admins can manage community events"
  ON public.community_events
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- Remover a política acima e ajustar caso for criar lógica de admin futuramente.

