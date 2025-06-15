
import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const { profile } = useAuth();

  const getUserDisplayName = () => {
    if (profile?.name) {
      return profile.name.split(' ')[0];
    }
    return "Usuário";
  };

  // Sincronização do Avatar
  let profileAvatar: string | undefined;
  try {
    const { avatar } = JSON.parse(localStorage.getItem('profileData') || "{}");
    profileAvatar = avatar;
  } catch (e) {
    profileAvatar = undefined;
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar - only visible on desktop */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>
      
      <div className="flex-1 md:ml-64 w-full">
        {/* Mobile header */}
        <header className="flex items-center justify-between p-4 border-b md:hidden">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold gradient-text">Transcare</span>
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <DashboardSidebar />
            </SheetContent>
          </Sheet>
        </header>
        
        {/* Desktop header */}
        <header className="hidden md:flex items-center justify-end p-4 border-b gap-4">
          <div className="flex items-center gap-3">
            <span className="mr-2 text-sm font-medium">
              Olá, {getUserDisplayName()}
            </span>
            <Link to="/dashboard/profile">
              <Avatar className="h-8 w-8">
                {profileAvatar ? (
                  <AvatarImage src={profileAvatar} />
                ) : (
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {getUserDisplayName().charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            </Link>
            {/* BOTÃO DE SAIR REMOVIDO DO HEADER */}
          </div>
        </header>
        
        <main className="p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
