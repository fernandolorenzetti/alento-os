import { useOutletContext } from "react-router-dom";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  company,
  rocks,
  scorecardMetrics,
  issues,
  people,
  peopleAnalysis,
} from "@/data/seed";
import { Mountain, Users, Target, AlertCircle, Download, ChevronDown, Search } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Weekly performance data for bar chart
const weeklyData = Array.from({ length: 13 }, (_, i) => ({
  name: `S${i + 1}`,
  valor: Math.round(700 + Math.random() * 400),
}));

// Rocks donut data
const onTrack = rocks.filter((r) => r.status === "on_track").length;
const offTrack = rocks.filter((r) => r.status === "off_track").length;
const complete = rocks.filter((r) => r.status === "complete").length;
const avgProgress = Math.round(rocks.reduce((a, r) => a + r.progress, 0) / rocks.length);

const donutData = [
  { name: "No Prazo", value: onTrack, color: "hsl(160, 84%, 39%)" },
  { name: "Em Risco", value: offTrack, color: "hsl(0, 84%, 60%)" },
  { name: "Concluído", value: complete, color: "hsl(16, 100%, 60%)" },
];

// Recent activity
const recentActivity = [
  { action: "Rock atualizado", detail: "Implementar sistema ERP integrado — 65%", person: "RC", time: "Hoje, 14:32" },
  { action: "Issue resolvida", detail: "Falta de padronização nos relatórios", person: "AS", time: "Hoje, 11:20" },
  { action: "Scorecard atualizado", detail: "Receita semanal: R$910 mil", person: "AS", time: "Ontem, 17:45" },
  { action: "Rock atualizado", detail: "Certificação ISO 9001 — 80%", person: "CM", time: "Ontem, 10:15" },
  { action: "Issue criada", detail: "Atraso na entrega de materiais", person: "CM", time: "Seg, 09:30" },
];

const metricsOnTarget = scorecardMetrics.filter(
  (m) => m.weeks[m.weeks.length - 1].metGoal
).length;

export default function Dashboard() {
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();

  const today = new Date();
  const dateStr = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle={`${company.name} · ${company.quarter}`}
        onMenuClick={onMenuClick}
      />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-[1400px] mx-auto space-y-6 animate-fade-in">
          {/* Welcome + Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Bem-vindo de volta, Fernando!
              </h2>
              <p className="text-sm text-muted-foreground capitalize">{dateStr}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-sm gap-1.5">
                Este Mês <ChevronDown className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="sm" className="text-sm gap-1.5">
                <Download className="h-3.5 w-3.5" /> Exportar
              </Button>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total de Rocks"
              value={rocks.length}
              trend="+2 do último trimestre"
              trendUp
              icon={Mountain}
            />
            <StatCard
              title="Pessoas Avaliadas"
              value={peopleAnalysis.length}
              trend="Todos avaliados"
              trendUp
              icon={Users}
            />
            <StatCard
              title="Métricas no Alvo"
              value={`${metricsOnTarget}/${scorecardMetrics.length}`}
              trend={`${Math.round((metricsOnTarget / scorecardMetrics.length) * 100)}% esta semana`}
              trendUp={metricsOnTarget >= scorecardMetrics.length / 2}
              icon={Target}
            />
            <StatCard
              title="Issues em Aberto"
              value={issues.filter((i) => i.column !== "solve").length}
              trend="2 prioridade alta"
              trendUp={false}
              icon={AlertCircle}
            />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-6">
            {/* Bar Chart */}
            <Card>
              <CardHeader className="pb-2 flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-display">Desempenho Trimestral</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Receita semanal (R$ mil)</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="secondary" size="sm" className="text-xs h-7 px-3">Semanal</Button>
                  <Button variant="ghost" size="sm" className="text-xs h-7 px-3 text-muted-foreground">Mensal</Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(0 0% 91%)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(0 0% 91%)",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="valor" fill="hsl(16, 100%, 60%)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Donut Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-display">Visão Geral dos Rocks</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Progresso do trimestre</p>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {donutData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-3xl font-bold text-foreground">{avgProgress}%</span>
                    <span className="text-[10px] text-muted-foreground">Conclusão</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  {donutData.map((d) => (
                    <div key={d.name} className="flex items-center gap-1.5 text-xs">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-muted-foreground">{d.name}: {d.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3 flex-row items-center justify-between">
              <CardTitle className="text-base font-display">Atividade Recente</CardTitle>
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  placeholder="Buscar..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border bg-muted/40 focus:outline-none focus:ring-1 focus:ring-primary/40"
                  readOnly
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-[11px] font-bold text-primary shrink-0">
                      {item.person}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                    </div>
                    <span className="text-[11px] text-muted-foreground shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
