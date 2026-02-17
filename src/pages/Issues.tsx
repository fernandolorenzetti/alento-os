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
  const [issueList, setIssueList] = useState<Issue[]>(seedIssues);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, colKey: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverCol(colKey);
  };

  const handleDragLeave = () => {
    setDragOverCol(null);
  };

  const handleDrop = (e: React.DragEvent, colKey: Issue["column"]) => {
    e.preventDefault();
    setDragOverCol(null);
    if (!draggedId) return;
    setIssueList((prev) =>
      prev.map((issue) =>
        issue.id === draggedId ? { ...issue, column: colKey } : issue
      )
    );
    setDraggedId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverCol(null);
  };

  return (
    <>
      <Topbar title="Issues (IDS)" subtitle="Identificar · Discutir · Resolver" onMenuClick={onMenuClick} />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-[1400px] mx-auto animate-fade-in">
          <div className="grid md:grid-cols-3 gap-4">
            {columns.map((col) => {
              const colIssues = issueList.filter((i) => i.column === col.key);
              const isOver = dragOverCol === col.key;
              return (
                <div
                  key={col.key}
                  onDragOver={(e) => handleDragOver(e, col.key)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, col.key)}
                  className={`rounded-xl transition-all duration-200 ${
                    isOver ? "ring-2 ring-primary/50 bg-primary/5" : ""
                  }`}
                >
                  <div className={`rounded-t-xl px-4 py-3 ${col.color}`}>
                    <span className={`text-sm font-display font-bold ${col.textColor}`}>
                      {col.icon} {col.label} · {colIssues.length}
                    </span>
                  </div>
                  <div className="space-y-2 pt-2 min-h-[80px]">
                    {colIssues.map((issue) => {
                      const owner = people.find((p) => p.id === issue.ownerId);
                      const isDragging = draggedId === issue.id;
                      return (
                        <Card
                          key={issue.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, issue.id)}
                          onDragEnd={handleDragEnd}
                          className={`hover:border-primary/40 transition-all cursor-grab active:cursor-grabbing ${
                            isDragging ? "opacity-40 scale-95" : ""
                          }`}
                        >
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
