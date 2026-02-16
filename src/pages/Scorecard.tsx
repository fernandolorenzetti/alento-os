import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { scorecardMetrics as seedMetrics, people, type ScorecardMetric } from "@/data/seed";
import { TrendingUp, TrendingDown, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

const weekNumbers = [4, 5, 6, 7];

export default function Scorecard() {
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();
  const [metrics, setMetrics] = useState<ScorecardMetric[]>(seedMetrics);

  const [name, setName] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [target, setTarget] = useState("");
  const [weekValues, setWeekValues] = useState<Record<number, string>>(
    Object.fromEntries(weekNumbers.map((w) => [w, ""]))
  );

  const handleAdd = () => {
    if (!name.trim() || !target.trim()) {
      toast.error("Nome do indicador e meta são obrigatórios.");
      return;
    }

    const newMetric: ScorecardMetric = {
      id: `s-${Date.now()}`,
      name: name.trim(),
      ownerId: ownerId || people[0].id,
      target,
      weeks: weekNumbers.map((week) => {
        const val = weekValues[week] || "";
        const numTarget = parseFloat(target.replace(/[^\d.,]/g, ""));
        const numVal = parseFloat(val);
        return {
          week,
          value: val,
          metGoal: !isNaN(numTarget) && !isNaN(numVal) ? numVal >= numTarget : false,
        };
      }),
      trend: "stable",
      trendValue: "→",
    };

    setMetrics((prev) => [...prev, newMetric]);
    setName("");
    setOwnerId("");
    setTarget("");
    setWeekValues(Object.fromEntries(weekNumbers.map((w) => [w, ""])));
    toast.success("Indicador adicionado com sucesso!");
  };

  return (
    <>
      <Topbar title="Scorecard" subtitle="Indicadores Semanais" onMenuClick={onMenuClick} />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-[1400px] mx-auto animate-fade-in space-y-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="text-[11px] uppercase tracking-wider">Indicador</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wider text-center">Meta</TableHead>
                    {weekNumbers.map((w) => (
                      <TableHead key={w} className="text-[11px] uppercase tracking-wider text-center">S{w}</TableHead>
                    ))}
                    <TableHead className="text-[11px] uppercase tracking-wider text-center">Tendência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metrics.map((m) => {
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
                              {w.value && (
                                <div className={`h-2 w-2 rounded-full ${w.metGoal ? "bg-success" : "bg-destructive"}`} />
                              )}
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

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Novo Indicador</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="text-[11px] uppercase tracking-wider">Indicador</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wider">Responsável</TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wider text-center">Meta</TableHead>
                    {weekNumbers.map((w) => (
                      <TableHead key={w} className="text-[11px] uppercase tracking-wider text-center">S{w}</TableHead>
                    ))}
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Input
                        placeholder="Nome do indicador"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-8 text-sm"
                      />
                    </TableCell>
                    <TableCell>
                      <Select value={ownerId} onValueChange={setOwnerId}>
                        <SelectTrigger className="h-8 text-sm w-[160px]">
                          <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {people.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.initials} · {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Meta"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="h-8 text-sm w-20 text-center"
                      />
                    </TableCell>
                    {weekNumbers.map((w) => (
                      <TableCell key={w}>
                        <Input
                          type="number"
                          placeholder="—"
                          value={weekValues[w]}
                          onChange={(e) =>
                            setWeekValues((prev) => ({ ...prev, [w]: e.target.value }))
                          }
                          className="h-8 text-sm w-16 text-center font-mono"
                        />
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button size="sm" onClick={handleAdd} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Plus className="h-4 w-4 mr-1" />
                        Adicionar
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
