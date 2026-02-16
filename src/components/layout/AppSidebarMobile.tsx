import {
  LayoutDashboard,
  Target,
  Mountain,
  BarChart3,
  AlertCircle,
  Clock,
  Users,
  GitBranch,
  ChevronDown,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { company, issues } from "@/data/seed";

const mainNav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "VTO", url: "/vto", icon: Target },
  { title: "Rocks", url: "/rocks", icon: Mountain },
  { title: "Scorecard", url: "/scorecard", icon: BarChart3 },
  { title: "Issues (IDS)", url: "/issues", icon: AlertCircle, badge: issues.filter(i => i.priority === "HIGH").length },
  { title: "Reunião L10", url: "/l10", icon: Clock },
];

const toolsNav = [
  { title: "Analisador de Pessoas", url: "/people", icon: Users },
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

      <div className="mx-4 mb-4 p-3 rounded-xl bg-secondary/60 border border-border">
        <p className="text-xs font-semibold text-foreground truncate">{company.name}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {company.quarter} · Semana {company.currentWeek}/{company.totalWeeks}
        </p>
      </div>

      <nav className="flex-1 px-3 overflow-y-auto">
        <div className="flex items-center px-3 mb-1">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Menu Principal</span>
        </div>
        <div className="space-y-0.5">
          {mainNav.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === "/"}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors"
              activeClassName="bg-secondary border-l-[3px] border-primary text-primary font-semibold"
              onClick={onNavigate}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              <span>{item.title}</span>
              {item.badge ? (
                <span className="ml-auto text-[10px] font-mono font-bold bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 leading-none">
                  {item.badge}
                </span>
              ) : null}
            </NavLink>
          ))}
        </div>

        <div className="my-4 mx-3 h-px bg-border" />
        <div className="flex items-center px-3 mb-1">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Ferramentas</span>
        </div>
        <div className="space-y-0.5">
          {toolsNav.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors"
              activeClassName="bg-secondary border-l-[3px] border-primary text-primary font-semibold"
              onClick={onNavigate}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
