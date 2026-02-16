import { useOutletContext } from "react-router-dom";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { vtoData } from "@/data/seed";

export default function VTO() {
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();

  return (
    <>
      <Topbar title="VTO" subtitle="Vision/Traction Organizer" onMenuClick={onMenuClick} />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-[1400px] mx-auto animate-fade-in grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-sm uppercase tracking-wider text-primary font-display">◎ Valores Fundamentais</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {vtoData.coreValues.map((v, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm uppercase tracking-wider text-primary font-display">Propósito & Causa</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-[10px] uppercase text-muted-foreground tracking-wider mb-1">Por quê existimos</p>
                <p className="text-sm leading-relaxed">{vtoData.purpose}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-muted-foreground tracking-wider mb-1">Nicho de mercado</p>
                <p className="text-sm leading-relaxed">{vtoData.niche}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 bg-secondary/40">
            <CardHeader><CardTitle className="text-sm uppercase tracking-wider text-primary font-display">BHAG — Grande Meta Ousada (10 Anos)</CardTitle></CardHeader>
            <CardContent>
              <p className="font-display text-lg lg:text-xl font-bold text-primary leading-snug">{vtoData.bhag}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm uppercase tracking-wider text-primary font-display">Visão de 3 Anos</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm font-medium">{vtoData.vision3yr.revenue}</p>
              <ul className="space-y-2">
                {vtoData.vision3yr.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm uppercase tracking-wider text-primary font-display">Plano de 1 Ano</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {vtoData.plan1yr.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader><CardTitle className="text-sm uppercase tracking-wider text-primary font-display">Questões Estratégicas</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {vtoData.strategicIssues.map((q, i) => (
                  <li key={i} className="text-sm text-muted-foreground italic">"{q}"</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
