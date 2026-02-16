import { Menu, Search, HelpCircle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopbarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onMenuClick?: () => void;
}

export function Topbar({ title, subtitle, actions, onMenuClick }: TopbarProps) {
  return (
    <header className="h-20 flex items-center justify-between px-6 lg:px-8 bg-card/80 backdrop-blur-sm border-b border-border shadow-sm shrink-0">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs lg:text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Search bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar rocks, pessoas, issues..."
            className="pl-9 pr-16 bg-muted/50 border-border/60 h-9 text-sm rounded-xl"
            readOnly
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground bg-background border border-border rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {actions}
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <div className="ml-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-[11px] font-bold text-primary-foreground">FL</span>
        </div>
      </div>
    </header>
  );
}
