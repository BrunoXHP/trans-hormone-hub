
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface AccountSettings {
  email: string;
  name: string;
  phone: string;
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  appointments: boolean;
  reminders: boolean;
  updates: boolean;
}

interface PrivacySettings {
  shareData: boolean;
  allowResearch: boolean;
  profileVisibility: string;
}

export const useSettings = () => {
  const { toast } = useToast();
  const { profile, fetchProfile } = useAuth();

  const [accountSettings, setAccountSettings] = useState<AccountSettings>(() => {
    const saved = localStorage.getItem('accountSettings');
    return saved ? JSON.parse(saved) : {
      email: "",
      name: "",
      phone: "",
    };
  });

  const [notifications, setNotifications] = useState<NotificationSettings>(() => {
    const saved = localStorage.getItem('notificationSettings');
    return saved ? JSON.parse(saved) : {
      email: true,
      sms: false,
      appointments: true,
      reminders: true,
      updates: false,
    };
  });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(() => {
    const saved = localStorage.getItem('privacySettings');
    return saved ? JSON.parse(saved) : {
      shareData: false,
      allowResearch: true,
      profileVisibility: "private",
    };
  });

  // Update account settings when profile changes
  useEffect(() => {
    if (profile) {
      setAccountSettings(prev => ({
        ...prev,
        email: profile.email,
        name: profile.name,
      }));
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('accountSettings', JSON.stringify(accountSettings));
    console.log('Account settings saved:', accountSettings);
  }, [accountSettings]);

  useEffect(() => {
    localStorage.setItem('notificationSettings', JSON.stringify(notifications));
    console.log('Notification settings saved:', notifications);
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
    console.log('Privacy settings saved:', privacySettings);
  }, [privacySettings]);

  const saveAccountSettings = async (newSettings: AccountSettings) => {
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
          name: newSettings.name,
          email: newSettings.email,
        })
        .eq('id', profile.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Erro",
          description: "Erro ao salvar configurações.",
          variant: "destructive",
        });
        return;
      }

      setAccountSettings(newSettings);
      
      // Refresh profile data
      await fetchProfile(profile.id);
      
      toast({
        title: "Configurações salvas",
        description: "Suas configurações de conta foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error('Unexpected error saving settings:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    }
  };

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      
      toast({
        title: "Preferências atualizadas",
        description: "Suas preferências de notificação foram salvas.",
      });
      
      return newSettings;
    });
  };

  const togglePrivacy = (key: keyof PrivacySettings) => {
    if (typeof privacySettings[key] === "boolean") {
      setPrivacySettings(prev => {
        const newSettings = { ...prev, [key]: !prev[key] };
        
        toast({
          title: "Configurações de privacidade atualizadas",
          description: "Suas preferências de privacidade foram salvas.",
        });
        
        return newSettings;
      });
    }
  };

  return {
    accountSettings,
    notifications,
    privacySettings,
    saveAccountSettings,
    toggleNotification,
    togglePrivacy,
    setAccountSettings,
  };
};
