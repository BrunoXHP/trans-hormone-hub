
import { Link, useLocation } from "react-router-dom";
import { Calendar, Home, Mail, Search, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

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
    title: "Configurações",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r p-4 hidden md:block">
      <Link to="/" className="flex items-center mb-8 mt-4">
        <span className="text-xl font-bold gradient-text">Transcare</span>
      </Link>
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              location.pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
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
