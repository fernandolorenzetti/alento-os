import { useOutletContext } from "react-router-dom";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { scorecardMetrics, people } from "@/data/seed";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function Scorecard() {
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();

  return (
    <>
      <Topbar title="Scorecard" subtitle="Indicadores Semanais" onMenuClick={onMenuClick} />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-[1400px] mx-auto animate-fade-in">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="text-[11px] uppercase tracking-wider">Indicador</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wider text-center">Meta</TableHead>
                    {scorecardMetrics[0].weeks.map((w) => (
                      <TableHead key={w.week} className="text-[11px] uppercase tracking-wider text-center">S{w.week}</TableHead>
                    ))}
                    <TableHead className="text-[11px] uppercase tracking-wider text-center">Tendência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scorecardMetrics.map((m) => {
                    const owner = people.find((p) => p.id === m.ownerId);
                    return (
                      <TableRow key={m.id} className="hover:bg-secondary/30">
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{m.name}</p>
                            <p className="text-[11px] text-muted-foreground">{owner?.initials} · {owner?.role}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-mono text-sm text-muted-foreground">{m.target}</TableCell>
                        {m.weeks.map((w) => (
                          <TableCell key={w.week} className="text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <span className={`font-mono text-sm font-medium ${w.metGoal ? "text-success" : "text-destructive"}`}>
                                {w.value}
                              </span>
                              <div className={`h-2 w-2 rounded-full ${w.metGoal ? "bg-success" : "bg-destructive"}`} />
                            </div>
                          </TableCell>
                        ))}
                        <TableCell className="text-center">
                          <div className={`inline-flex items-center gap-1 text-sm font-medium ${
                            m.trend === "up" ? "text-success" : m.trend === "down" ? "text-destructive" : "text-warning"
                          }`}>
                            {m.trend === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : m.trend === "down" ? <TrendingDown className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                            <span className="font-mono text-xs">{m.trendValue}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
