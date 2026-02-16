import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { issues as seedIssues, people, type Issue } from "@/data/seed";

const priorityLabels: Record<string, string> = {
  HIGH: "ALTA",
  MED: "MÉDIA",
  LOW: "BAIXA",
};

const columns = [
  { key: "identify" as const, label: "Identificar", color: "bg-blue-50 dark:bg-blue-950/30", textColor: "text-blue-600", icon: "◉" },
  { key: "discuss" as const, label: "Discutir", color: "bg-secondary/50", textColor: "text-primary", icon: "◎" },
  { key: "solve" as const, label: "Resolver", color: "bg-emerald-50 dark:bg-emerald-950/30", textColor: "text-success", icon: "◆" },
];

export default function Issues() {
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();
  const [issueList] = useState<Issue[]>(seedIssues);

  return (
    <>
      <Topbar title="Issues (IDS)" subtitle="Identificar · Discutir · Resolver" onMenuClick={onMenuClick} />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-[1400px] mx-auto animate-fade-in">
          <div className="grid md:grid-cols-3 gap-4">
            {columns.map((col) => {
              const colIssues = issueList.filter((i) => i.column === col.key);
              return (
                <div key={col.key}>
                  <div className={`rounded-t-xl px-4 py-3 ${col.color}`}>
                    <span className={`text-sm font-display font-bold ${col.textColor}`}>
                      {col.icon} {col.label} · {colIssues.length}
                    </span>
                  </div>
                  <div className="space-y-2 pt-2">
                    {colIssues.map((issue) => {
                      const owner = people.find((p) => p.id === issue.ownerId);
                      return (
                        <Card key={issue.id} className="hover:border-primary/40 transition-colors cursor-pointer">
                          <CardContent className="p-3.5 space-y-2">
                            <p className="text-sm font-medium leading-snug">{issue.title}</p>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={`text-[10px] font-mono ${
                                  issue.priority === "HIGH"
                                    ? "border-destructive/40 text-destructive"
                                    : issue.priority === "MED"
                                    ? "border-warning/40 text-warning"
                                    : "border-muted-foreground/40 text-muted-foreground"
                                }`}
                              >
                                {priorityLabels[issue.priority]}
                              </Badge>
                              <span className="text-[11px] text-muted-foreground">▲ {issue.votes} votos</span>
                              <span className="ml-auto text-[11px] text-muted-foreground">{owner?.initials}</span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
