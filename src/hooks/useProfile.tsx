
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

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

  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('profileData');
    return saved ? JSON.parse(saved) : {
      name: "Ana Silva",
      email: "ana.silva@email.com",
      gender: "trans-woman",
      birthdate: "1990-05-15",
      startDate: "2022-11-10",
      currentTherapy: "Estradiol + Espironolactona",
      avatar: "",
    };
  });

  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
    console.log('Profile data saved:', profileData);
  }, [profileData]);

  const updateProfile = (newData: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...newData }));
  };

  const saveProfile = () => {
    // Data is already saved via useEffect, just show confirmation
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
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
