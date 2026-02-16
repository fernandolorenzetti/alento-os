import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onMenuClick?: () => void;
}

export function Topbar({ title, subtitle, actions, onMenuClick }: TopbarProps) {
  return (
    <header className="h-20 flex items-center justify-between px-6 lg:px-8 bg-card/80 backdrop-blur-sm border-b border-border shadow-topbar shrink-0">
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
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
