import { useOutletContext } from "react-router-dom";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { rocks, people, company } from "@/data/seed";

const statusLabels: Record<string, string> = {
  on_track: "NO PRAZO",
  off_track: "EM RISCO",
  complete: "CONCLUÍDO",
};

export default function Rocks() {
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();
  const onTrack = rocks.filter((r) => r.status === "on_track").length;
  const offTrack = rocks.filter((r) => r.status === "off_track").length;
  const complete = rocks.filter((r) => r.status === "complete").length;

  return (
    <>
      <Topbar title="Rocks" subtitle="Metas Trimestrais" onMenuClick={onMenuClick} />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-[1400px] mx-auto space-y-6 animate-fade-in">
          <Card className="border-l-4 border-l-primary bg-gradient-to-r from-secondary/60 to-card">
            <CardContent className="p-5 flex flex-wrap gap-6 items-center">
              <div>
                <h3 className="font-display text-lg font-bold">{company.quarter} · Rocks</h3>
                <p className="text-sm text-muted-foreground">Semana {company.currentWeek} de {company.totalWeeks}</p>
              </div>
              <div className="flex gap-6 ml-auto text-center">
                <div><span className="font-display text-2xl font-bold">{rocks.length}</span><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</p></div>
                <div><span className="font-display text-2xl font-bold text-success">{onTrack}</span><p className="text-[10px] uppercase tracking-wider text-muted-foreground">No Prazo</p></div>
                <div><span className="font-display text-2xl font-bold text-destructive">{offTrack}</span><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Em Risco</p></div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rocks.map((rock) => {
              const owner = people.find((p) => p.id === rock.ownerId);
              return (
                <Card key={rock.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-bold text-primary-foreground"
                          style={{ backgroundColor: owner?.color }}
                        >
                          {owner?.initials}
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-mono ${
                            rock.status === "on_track"
                              ? "border-success/40 text-success"
                              : rock.status === "complete"
                              ? "border-primary/40 text-primary"
                              : "border-destructive/40 text-destructive"
                          }`}
                        >
                          {statusLabels[rock.status]}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm font-medium leading-snug">{rock.title}</p>
                    <div className="text-[11px] text-muted-foreground">
                      {owner?.name} · Vence: {rock.dueDate}
                    </div>
                    <Progress value={rock.progress} className="h-1" />
                    <p className="text-[11px] text-muted-foreground">{rock.progress}%</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
