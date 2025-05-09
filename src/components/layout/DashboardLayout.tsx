
import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [username, setUsername] = useState("Usuário");
  const isMobile = useIsMobile();
  
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
        <header className="hidden md:flex items-center justify-end p-4 border-b">
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium">Olá, {username}</span>
            <Link to="/dashboard/profile">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/20 text-primary">
                  {username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
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
