
import { Link, useLocation } from "react-router-dom";
import { Calendar, Home, Search, Settings, User, Users } from "lucide-react";
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
      "w-64 bg-sidebar/95 backdrop-blur-sm border-r border-sidebar-border p-4 flex flex-col h-full",
      isMobile ? "relative" : "fixed left-0 top-0"
    )}>
      <Link to="/" className="flex items-center mb-8 mt-4">
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Transcare
        </span>
      </Link>
      
      <nav className="space-y-1 flex-grow">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200",
              location.pathname === item.href
                ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary font-medium border-l-2 border-primary shadow-sm"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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
