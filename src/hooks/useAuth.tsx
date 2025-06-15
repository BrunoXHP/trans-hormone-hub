
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  name: string;
  email: string;
  gender: string;
  birth_date: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Verificar se o email foi confirmado antes de buscar o perfil
          if (session.user.email_confirmed_at) {
            setTimeout(() => {
              fetchProfile(session.user.id);
            }, 0);
          } else {
            console.log('Email not confirmed yet');
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user && session.user.email_confirmed_at) {
        await fetchProfile(session.user.id);
      }
      
      setLoading(false);
    };

    getInitialSession();

    return () => subscription.unsubscribe();
  }, []);

  // Se não achar perfil, desloga do dashboard (apenas se o email estiver confirmado)
  useEffect(() => {
    if (!loading && user && user.email_confirmed_at && !profile) {
      // Perfil foi excluido, mas user ainda existe (inconsistente)
      supabase.auth.signOut().then(() => {
        toast({
          title: "Acesso bloqueado",
          description: "Sua conta não existe mais. Faça login novamente.",
          variant: "destructive",
        });
        navigate("/");
      });
    }
  }, [profile, loading, user]);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      console.log('Profile fetched:', data);
      setProfile(data);
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in with:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        
        // Verificar se é erro de email não confirmado
        if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email não confirmado",
            description: "Por favor, verifique seu email e clique no link de confirmação antes de fazer login.",
            variant: "destructive",
          });
          return false;
        }
        
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      console.log('Sign in successful:', data.user?.id);
      
      // Verificar se o email foi confirmado
      if (!data.user?.email_confirmed_at) {
        toast({
          title: "Email não confirmado",
          description: "Por favor, verifique seu email e clique no link de confirmação.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        return false;
      }
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta.",
      });
      
      navigate("/dashboard");
      return true;
    } catch (error) {
      console.error('Unexpected error during sign in:', error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: "Erro",
          description: "Erro ao sair da conta.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      
      navigate("/");
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
    }
  };

  return {
    user,
    session,
    profile,
    loading,
    signIn,
    signOut,
    fetchProfile,
  };
};
