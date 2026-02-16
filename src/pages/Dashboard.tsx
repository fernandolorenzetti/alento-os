import { useNavigate, useOutletContext } from "react-router-dom";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  healthScores,
  company,
  rocks,
  scorecardMetrics,
  issues,
  people,
} from "@/data/seed";
import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

function getScoreColor(score: number) {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-destructive";
}

function getScoreBg(score: number) {
  if (score >= 80) return "bg-success/10";
  if (score >= 60) return "bg-warning/10";
  return "bg-destructive/10";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();

  const onTrack = rocks.filter((r) => r.status === "on_track").length;
  const offTrack = rocks.filter((r) => r.status === "off_track").length;
  const progressPercent = Math.round((company.currentWeek / company.totalWeeks) * 100);
  const topRocks = rocks.slice(0, 3);
  const topMetrics = scorecardMetrics.slice(0, 5);
  const openIssues = issues.filter((i) => i.column !== "solve").slice(0, 5);

  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle={`${company.name} · ${company.quarter}`}
        onMenuClick={onMenuClick}
      />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-[1400px] mx-auto space-y-6 animate-fade-in">
          {/* Health Score Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {healthScores.map((h) => (
              <Card
                key={h.id}
                className="cursor-pointer hover:shadow-card-hover transition-shadow duration-200 border-border"
                onClick={() => navigate(h.route)}
              >
                <CardContent className="p-4 text-center">
                  <span className={`font-display text-3xl lg:text-4xl font-bold ${getScoreColor(h.score)}`}>
                    {h.score}
                  </span>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 font-medium">
                    {h.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{h.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quarter Banner */}
          <Card className="border-l-4 border-l-primary bg-gradient-to-r from-secondary/60 to-card">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {company.quarter} · {company.quarterLabel}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Semana {company.currentWeek} de {company.totalWeeks} · {progressPercent}% concluído
                </p>
                <div className="mt-2 w-48">
                  <Progress value={progressPercent} className="h-1.5" />
                </div>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <span className="font-display text-2xl font-bold text-foreground">{rocks.length}</span>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Rocks</p>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold text-success">{onTrack}</span>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">On Track</p>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold text-destructive">{offTrack}</span>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Em Risco</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Two columns */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Rocks Summary */}
            <Card>
              <CardHeader className="pb-3 flex-row items-center justify-between">
                <CardTitle className="text-base font-display">Rocks do Trimestre</CardTitle>
                <button
                  className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                  onClick={() => navigate("/rocks")}
                >
                  Ver todos <ArrowRight className="h-3 w-3" />
                </button>
              </CardHeader>
              <CardContent className="space-y-4">
                {topRocks.map((rock) => {
                  const owner = people.find((p) => p.id === rock.ownerId);
                  return (
                    <div key={rock.id} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground truncate pr-2">
                          {rock.title}
                        </p>
                        <Badge
                          variant={rock.status === "on_track" ? "default" : "destructive"}
                          className={`text-[10px] shrink-0 ${
                            rock.status === "on_track"
                              ? "bg-success/15 text-success border-success/30"
                              : "bg-destructive/15 text-destructive border-destructive/30"
                          }`}
                        >
                          {rock.status === "on_track" ? "ON TRACK" : "OFF TRACK"}
                        </Badge>
                      </div>
                      <Progress value={rock.progress} className="h-1" />
                      <div className="flex justify-between text-[11px] text-muted-foreground">
                        <span>{rock.progress}%</span>
                        <span>Vence: {rock.dueDate}</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Scorecard Summary */}
            <Card>
              <CardHeader className="pb-3 flex-row items-center justify-between">
                <CardTitle className="text-base font-display">Scorecard</CardTitle>
                <button
                  className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                  onClick={() => navigate("/scorecard")}
                >
                  Ver todos <ArrowRight className="h-3 w-3" />
                </button>
              </CardHeader>
              <CardContent className="space-y-3">
                {topMetrics.map((m) => {
                  const lastWeek = m.weeks[m.weeks.length - 1];
                  return (
                    <div key={m.id} className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate pr-2">{m.name}</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-sm font-medium ${
                            lastWeek.metGoal ? "text-success" : "text-destructive"
                          }`}
                        >
                          {lastWeek.value}
                        </span>
                        <div
                          className={`h-2 w-2 rounded-full ${
                            lastWeek.metGoal ? "bg-success" : "bg-destructive"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Open Issues */}
          <Card>
            <CardHeader className="pb-3 flex-row items-center justify-between">
              <CardTitle className="text-base font-display">Issues em Aberto</CardTitle>
              <button
                className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                onClick={() => navigate("/issues")}
              >
                Ver todos <ArrowRight className="h-3 w-3" />
              </button>
            </CardHeader>
            <CardContent className="space-y-2">
              {openIssues.map((issue) => {
                const owner = people.find((p) => p.id === issue.ownerId);
                return (
                  <div key={issue.id} className="flex items-center gap-3 py-1.5">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono shrink-0 ${
                        issue.priority === "HIGH"
                          ? "border-destructive/40 text-destructive"
                          : issue.priority === "MED"
                          ? "border-warning/40 text-warning"
                          : "border-muted-foreground/40 text-muted-foreground"
                      }`}
                    >
                      {issue.priority}
                    </Badge>
                    <p className="text-sm text-foreground truncate">{issue.title}</p>
                    <span className="ml-auto text-[11px] text-muted-foreground shrink-0">
                      {owner?.initials}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
