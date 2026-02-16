import {
  LayoutDashboard,
  Target,
  Mountain,
  BarChart3,
  AlertCircle,
  Clock,
  Users,
  GitBranch,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { company, issues } from "@/data/seed";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "VTO", url: "/vto", icon: Target },
  { title: "Rocks", url: "/rocks", icon: Mountain },
  { title: "Scorecard", url: "/scorecard", icon: BarChart3 },
  { title: "Issues (IDS)", url: "/issues", icon: AlertCircle, badge: issues.filter(i => i.priority === "HIGH").length },
  { title: "Reunião L10", url: "/l10", icon: Clock },
  { title: "People Analyzer", url: "/people", icon: Users },
  { title: "Organograma", url: "/accountability", icon: GitBranch },
];

interface Props {
  onNavigate: () => void;
}

export function AppSidebarMobile({ onNavigate }: Props) {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-6 pb-4">
        <h1 className="font-display text-2xl font-bold text-primary">Alento</h1>
      </div>

      <div className="mx-4 mb-4 p-3 rounded-lg bg-secondary/60 border border-border">
        <p className="text-xs font-semibold text-foreground truncate">{company.name}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {company.quarter} · Semana {company.currentWeek}/{company.totalWeeks}
        </p>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            activeClassName="bg-gradient-to-r from-secondary to-transparent border-l-[3px] border-primary text-primary font-semibold"
            onClick={onNavigate}
          >
            <item.icon className="h-[18px] w-[18px] shrink-0" />
            <span>{item.title}</span>
            {item.badge ? (
              <span className="ml-auto text-[10px] font-mono font-bold bg-destructive text-destructive-foreground rounded-full px-1.5 py-0.5 leading-none">
                {item.badge}
              </span>
            ) : null}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
