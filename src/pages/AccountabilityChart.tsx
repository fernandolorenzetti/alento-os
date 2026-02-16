import { useOutletContext } from "react-router-dom";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orgChart, people } from "@/data/seed";

export default function AccountabilityChart() {
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();
  const root = orgChart.find((n) => !n.parentId)!;
  const integrator = orgChart.find((n) => n.parentId === root.id)!;
  const leaders = orgChart.filter((n) => n.parentId === integrator.id);

  const renderNode = (node: typeof orgChart[0], isRoot = false) => {
    const person = people.find((p) => p.id === node.personId)!;
    return (
      <div className={`inline-flex flex-col items-center ${isRoot ? "mb-2" : ""}`}>
        <Card className={`min-w-[180px] hover:shadow-card-hover transition-shadow ${isRoot ? "border-primary border-2" : ""}`}>
          <CardContent className="p-4 text-center">
            <p className="text-[10px] uppercase tracking-wider text-primary font-mono font-medium">{node.role}</p>
            <p className="text-sm font-semibold mt-1">{person.name}</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <>
      <Topbar title="Organograma" subtitle="Accountability Chart" onMenuClick={onMenuClick} />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-[1400px] mx-auto space-y-8 animate-fade-in">
          {/* Org Chart Visual */}
          <div className="flex flex-col items-center gap-2">
            {renderNode(root, true)}
            <div className="w-px h-6 bg-border" />
            {renderNode(integrator)}
            <div className="w-px h-6 bg-border" />
            <div className="flex flex-wrap justify-center gap-4">
              {leaders.map((leader) => (
                <div key={leader.id} className="flex flex-col items-center">
                  <div className="w-px h-4 bg-border" />
                  {renderNode(leader)}
                </div>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="grid md:grid-cols-2 gap-4">
            {orgChart.map((node) => {
              const person = people.find((p) => p.id === node.personId)!;
              return (
                <Card key={node.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[11px] uppercase tracking-wider text-primary font-mono">
                      {node.role} — {person.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {node.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
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
