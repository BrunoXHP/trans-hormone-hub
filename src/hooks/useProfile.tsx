
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ProfileData {
  name: string;
  email: string;
  gender: string;
  birthdate: string;
  startDate: string;
  currentTherapy: string;
  avatar: string;
}

export const useProfile = () => {
  const { toast } = useToast();
  const { profile, fetchProfile } = useAuth();

  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('profileData');
    return saved ? JSON.parse(saved) : {
      name: "",
      email: "",
      gender: "",
      birthdate: "",
      startDate: "",
      currentTherapy: "",
      avatar: "",
    };
  });

  // Update profile data when auth profile changes
  useEffect(() => {
    if (profile) {
      setProfileData(prev => ({
        ...prev,
        name: profile.name,
        email: profile.email,
        gender: profile.gender,
        birthdate: profile.birth_date || "",
      }));
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
    console.log('Profile data saved:', profileData);
  }, [profileData]);

  const updateProfile = (newData: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...newData }));
  };

  const saveProfile = async () => {
    try {
      if (!profile) {
        toast({
          title: "Erro",
          description: "Usuário não encontrado.",
          variant: "destructive",
        });
        return;
      }

      // Update the profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profileData.name,
          email: profileData.email,
          gender: profileData.gender,
          birth_date: profileData.birthdate || null,
        })
        .eq('id', profile.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Erro",
          description: "Erro ao salvar perfil.",
          variant: "destructive",
        });
        return;
      }

      // Refresh profile data
      await fetchProfile(profile.id);

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });
    } catch (error) {
      console.error('Unexpected error saving profile:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    }
  };

  const updateAvatar = (avatar: string) => {
    setProfileData(prev => ({ ...prev, avatar }));
    toast({
      title: "Avatar atualizado",
      description: "Sua foto de perfil foi atualizada com sucesso.",
    });
  };

  return {
    profileData,
    updateProfile,
    saveProfile,
    updateAvatar,
  };
};
