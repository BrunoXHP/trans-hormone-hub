
import { Link, useLocation } from "react-router-dom";
import { Calendar, Home, Mail, Search, Settings, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type SideNavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const navItems: SideNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Perfil",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Agenda",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Informações",
    href: "/dashboard/info",
    icon: Search,
  },
  {
    title: "Mensagens",
    href: "/dashboard/messages",
    icon: Mail,
  },
  {
    title: "Comunidade",
    href: "/dashboard/community",
    icon: Users,
  },
  {
    title: "Configurações",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <aside className={cn(
      "w-64 bg-white/80 backdrop-blur-sm border-r p-4 flex flex-col h-full",
      isMobile ? "relative" : "fixed left-0 top-0"
    )}>
      <Link to="/" className="flex items-center mb-8 mt-4">
        <span className="text-xl font-bold gradient-trans">Transcare</span>
      </Link>
      
      <nav className="space-y-1 flex-grow">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              location.pathname === item.href
                ? "bg-gradient-to-r from-trans-blue to-trans-pink text-white"
                : "text-sidebar-foreground hover:bg-gradient-to-r hover:from-trans-blue/10 hover:to-trans-pink/10"
            )}
          >
            <item.icon size={18} />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
