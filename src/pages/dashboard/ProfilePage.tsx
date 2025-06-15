
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import TherapyInfoCard from "@/components/profile/TherapyInfoCard";

const ProfilePage = () => {
  const { profileData, updateProfile, saveProfile, updateAvatar } = useProfile();
  const location = useLocation();

  // Definir refs corretos por tipo do elemento
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    gender: useRef<HTMLButtonElement>(null),
    birthdate: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    startDate: useRef<HTMLInputElement>(null),
    currentTherapy: useRef<HTMLButtonElement>(null),
    avatar: useRef<HTMLDivElement>(null),
  };

  // Detecta search param "focus" e rola até o campo
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const focus = params.get("focus");
    if (focus && refs[focus as keyof typeof refs]) {
      setTimeout(() => {
        const node = refs[focus as keyof typeof refs]?.current;
        if (node) {
          node.scrollIntoView({ behavior: "smooth", block: "center" });
          // Visual highlight:
          (node as HTMLElement).classList.add("ring-2", "ring-primary");
          setTimeout(() => (node as HTMLElement).classList.remove("ring-2", "ring-primary"), 2200);
          if ("focus" in node) (node as HTMLElement).focus();
        }
      }, 280);
    }
  }, [location.search]);

  const handleInputChange = (field: string, value: string) => {
    updateProfile({ [field]: value });
  };

  const handleSave = () => {
    saveProfile();
  };

  const handleAvatarClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          updateAvatar(result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e preferências.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cards agrupados */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoCard
              profileData={{
                avatar: profileData.avatar,
                name: profileData.name,
                email: profileData.email,
                gender: profileData.gender,
                birthdate: profileData.birthdate,
                phone: profileData.phone,
              }}
              onInputChange={handleInputChange}
              onAvatarClick={handleAvatarClick}
              refs={{
                name: refs.name,
                email: refs.email,
                gender: refs.gender,
                birthdate: refs.birthdate,
                phone: refs.phone,
                avatar: refs.avatar,
              }}
            />

            <TherapyInfoCard
              profileData={{
                startDate: profileData.startDate,
                currentTherapy: profileData.currentTherapy,
              }}
              onInputChange={handleInputChange}
              refs={{
                startDate: refs.startDate,
                currentTherapy: refs.currentTherapy,
              }}
            />

            <div className="flex justify-end">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Salvar Alterações
              </Button>
            </div>
          </div>
          {/* Card extra removido */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
