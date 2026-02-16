import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Star } from "lucide-react";
import { people, company } from "@/data/seed";

const agendaItems = [
  { id: 1, name: "Check-in", description: "Compartilhar boas notícias", time: "5 min" },
  { id: 2, name: "Scorecard", description: "Revisão dos indicadores semanais", time: "5 min" },
  { id: 3, name: "Rocks", description: "Status das metas trimestrais", time: "5 min" },
  { id: 4, name: "Headlines", description: "Notícias e atualizações da empresa", time: "5 min" },
  { id: 5, name: "Lista de Tarefas", description: "Revisão das tarefas pendentes", time: "5 min" },
  { id: 6, name: "IDS", description: "Identificar, Discutir, Resolver issues", time: "60 min" },
  { id: 7, name: "Conclusão", description: "Recap, avaliação, mensagens em cascata", time: "5 min" },
];

export default function L10Meeting() {
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [currentItem, setCurrentItem] = useState(1);
  const [seconds, setSeconds] = useState(300);
  const [running, setRunning] = useState(false);
  const [rating, setRating] = useState(0);
  const [todos, setTodos] = useState([
    { id: 1, text: "Enviar relatório financeiro semanal", done: false },
    { id: 2, text: "Agendar visita ao canteiro Parque das Flores", done: false },
    { id: 3, text: "Revisar propostas comerciais pendentes", done: false },
  ]);
  const [attendance] = useState<Record<string, boolean>>({
    p1: true, p2: true, p3: true, p4: false, p5: true,
  });

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Topbar title="Reunião L10" subtitle={`Reunião Nível 10 · Semana ${company.currentWeek}`} onMenuClick={onMenuClick} />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-[1400px] mx-auto animate-fade-in grid lg:grid-cols-[1fr_340px] gap-6">
          {/* Agenda */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <CardTitle className="font-display text-base">Agenda — Semana {company.currentWeek}</CardTitle>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-success">
                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    Ao vivo
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {people.map((p) => (
                    <span
                      key={p.id}
                      className={`inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-full border ${
                        attendance[p.id] ? "bg-success/10 border-success/30 text-success" : "bg-destructive/10 border-destructive/30 text-destructive"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${attendance[p.id] ? "bg-success" : "bg-destructive"}`} />
                      {p.initials}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-1">
                {agendaItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                      currentItem === item.id ? "bg-secondary border border-primary/20" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setCurrentItem(item.id)}
                  >
                    <Checkbox
                      checked={!!checked[item.id]}
                      onCheckedChange={(v) => setChecked((c) => ({ ...c, [item.id]: !!v }))}
                      className="h-5 w-5 rounded-full"
                    />
                    <span className="font-mono text-xs text-muted-foreground w-5">{String(item.id).padStart(2, "0")}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${checked[item.id] ? "line-through text-muted-foreground" : ""}`}>{item.name}</p>
                      <p className="text-[11px] text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-5 text-center space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {agendaItems.find((a) => a.id === currentItem)?.name}
                </p>
                <p className={`font-display text-5xl font-bold tabular-nums ${running ? "text-success" : "text-primary"}`}>
                  {formatTime(seconds)}
                </p>
                <div className="flex justify-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => setRunning(!running)}>
                    {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => { setSeconds(300); setRunning(false); }}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-display">Tarefas</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {todos.map((t) => (
                  <div key={t.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={t.done}
                      onCheckedChange={() => setTodos((ts) => ts.map((x) => x.id === t.id ? { ...x, done: !x.done } : x))}
                    />
                    <span className={`text-sm ${t.done ? "line-through text-muted-foreground" : ""}`}>{t.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-display">Avaliação da Reunião</CardTitle></CardHeader>
              <CardContent className="text-center space-y-2">
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 10 }, (_, i) => (
                    <button key={i} onClick={() => setRating(i + 1)} className="p-0.5 transition-colors">
                      <Star className={`h-5 w-5 ${i < rating ? "fill-primary text-primary" : "text-border"}`} />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="font-display text-2xl font-bold text-primary">{rating}/10</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
