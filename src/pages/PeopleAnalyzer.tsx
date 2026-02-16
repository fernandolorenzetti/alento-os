import { useOutletContext } from "react-router-dom";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { people, peopleAnalysis, coreValues } from "@/data/seed";

function meetsEOS(analysis: typeof peopleAnalysis[0]) {
  const plusCount = analysis.coreValues.filter((cv) => cv.rating === "+").length;
  const minusCount = analysis.coreValues.filter((cv) => cv.rating === "-").length;
  const gwcOk = analysis.gwc.getIt && analysis.gwc.wantIt && analysis.gwc.capacity;
  return minusCount === 0 && gwcOk;
}

export default function PeopleAnalyzer() {
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();

  return (
    <>
      <Topbar title="People Analyzer" subtitle="Avaliação de Valores & GWC" onMenuClick={onMenuClick} />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-[1400px] mx-auto animate-fade-in grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {peopleAnalysis.map((analysis) => {
            const person = people.find((p) => p.id === analysis.personId)!;
            const ok = meetsEOS(analysis);
            return (
              <Card key={analysis.personId} className={`hover:shadow-card-hover transition-shadow ${!ok ? "border-destructive/40" : ""}`}>
                <CardContent className="p-5 space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground"
                      style={{ backgroundColor: person.color }}
                    >
                      {person.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{person.name}</p>
                      <p className="text-[11px] text-muted-foreground">{person.role}</p>
                    </div>
                  </div>

                  {/* Core Values */}
                  <div className="space-y-1.5">
                    {analysis.coreValues.map((cv) => (
                      <div key={cv.value} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{cv.value}</span>
                        <span className={`font-mono text-sm font-bold ${
                          cv.rating === "+" ? "text-success" : cv.rating === "+/-" ? "text-warning" : "text-destructive"
                        }`}>
                          {cv.rating}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* GWC */}
                  <div className="flex gap-2">
                    {(["getIt", "wantIt", "capacity"] as const).map((key) => {
                      const labels = { getIt: "GET IT", wantIt: "WANT IT", capacity: "CAPACITY" };
                      const val = analysis.gwc[key];
                      return (
                        <Badge
                          key={key}
                          variant="outline"
                          className={`text-[10px] font-mono ${
                            val ? "border-success/40 text-success" : "border-destructive/40 text-destructive"
                          }`}
                        >
                          {labels[key]} {val ? "✓" : "✗"}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </>
  );
}
