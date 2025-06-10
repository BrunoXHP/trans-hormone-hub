
-- Criar tabela de eventos da agenda para cada usuário
CREATE TABLE public.agenda_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  date date NOT NULL,
  time text,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.agenda_events ENABLE ROW LEVEL SECURITY;

-- Política para usuários visualizarem apenas seus próprios eventos
CREATE POLICY "Users can view their own agenda events" 
  ON public.agenda_events 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para usuários criarem seus próprios eventos
CREATE POLICY "Users can create their own agenda events" 
  ON public.agenda_events 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para usuários atualizarem seus próprios eventos
CREATE POLICY "Users can update their own agenda events" 
  ON public.agenda_events 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Política para usuários deletarem seus próprios eventos
CREATE POLICY "Users can delete their own agenda events" 
  ON public.agenda_events 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Criar índice para melhor performance nas consultas por usuário
CREATE INDEX idx_agenda_events_user_id ON public.agenda_events(user_id);
CREATE INDEX idx_agenda_events_date ON public.agenda_events(date);
