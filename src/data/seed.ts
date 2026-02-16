// Seed data for Construtora Lorenzetti — Q1 2026

export interface Person {
  id: string;
  name: string;
  initials: string;
  role: string;
  color: string;
}

export interface Rock {
  id: string;
  title: string;
  ownerId: string;
  status: "on_track" | "off_track" | "complete";
  progress: number;
  dueDate: string;
  description: string;
}

export interface ScorecardMetric {
  id: string;
  name: string;
  ownerId: string;
  target: string;
  weeks: { week: number; value: string; metGoal: boolean }[];
  trend: "up" | "down" | "stable";
  trendValue: string;
}

export interface Issue {
  id: string;
  title: string;
  priority: "HIGH" | "MED" | "LOW";
  column: "identify" | "discuss" | "solve";
  votes: number;
  ownerId: string;
  description: string;
}

export interface HealthScore {
  id: string;
  label: string;
  score: number;
  detail: string;
  route: string;
}

export interface CoreValueRating {
  value: string;
  rating: "+" | "+/-" | "-";
}

export interface PersonAnalysis {
  personId: string;
  coreValues: CoreValueRating[];
  gwc: { getIt: boolean; wantIt: boolean; capacity: boolean };
  notes: string;
}

export interface OrgNode {
  id: string;
  role: string;
  personId: string;
  parentId: string | null;
  responsibilities: string[];
}

export const company = {
  name: "Construtora Lorenzetti",
  quarter: "Q1 2026",
  quarterLabel: "Jan–Mar 2026",
  currentWeek: 7,
  totalWeeks: 13,
};

export const people: Person[] = [
  { id: "p1", name: "Fernando Lorenzetti", initials: "FL", role: "CEO / Visionário", color: "hsl(16 100% 60%)" },
  { id: "p2", name: "Rafael Costa", initials: "RC", role: "Integrador / COO", color: "hsl(200 80% 50%)" },
  { id: "p3", name: "Ana Beatriz Souza", initials: "AS", role: "Diretora Financeira", color: "hsl(280 70% 55%)" },
  { id: "p4", name: "Marcos Oliveira", initials: "MO", role: "Diretor Comercial", color: "hsl(120 60% 40%)" },
  { id: "p5", name: "Carlos Mendes", initials: "CM", role: "Diretor de Operações", color: "hsl(36 100% 50%)" },
];

export const rocks: Rock[] = [
  { id: "r1", title: "Implementar sistema ERP integrado", ownerId: "p2", status: "on_track", progress: 65, dueDate: "31/Mar/2026", description: "Migrar todos os processos para o novo ERP até o final do trimestre." },
  { id: "r2", title: "Fechar 3 novos contratos acima de R$5M", ownerId: "p4", status: "on_track", progress: 33, dueDate: "31/Mar/2026", description: "Prospectar e fechar contratos de grande porte no setor residencial premium." },
  { id: "r3", title: "Reduzir turnover para menos de 8%", ownerId: "p2", status: "off_track", progress: 25, dueDate: "31/Mar/2026", description: "Programa de retenção de talentos e revisão de benefícios." },
  { id: "r4", title: "Certificação ISO 9001 concluída", ownerId: "p5", status: "on_track", progress: 80, dueDate: "15/Mar/2026", description: "Finalizar auditoria e obter certificação." },
  { id: "r5", title: "Lançar programa de trainee 2026", ownerId: "p2", status: "on_track", progress: 50, dueDate: "28/Feb/2026", description: "Recrutar e treinar 10 trainees para áreas operacionais." },
  { id: "r6", title: "Margem líquida acima de 12%", ownerId: "p3", status: "on_track", progress: 70, dueDate: "31/Mar/2026", description: "Otimizar custos e renegociar contratos com fornecedores." },
  { id: "r7", title: "Entregar Residencial Parque das Flores", ownerId: "p5", status: "off_track", progress: 40, dueDate: "31/Mar/2026", description: "Concluir obras e obter habite-se do empreendimento." },
  { id: "r8", title: "Pipeline comercial de R$50M", ownerId: "p4", status: "on_track", progress: 60, dueDate: "31/Mar/2026", description: "Construir pipeline qualificado para os próximos 2 trimestres." },
];

export const scorecardMetrics: ScorecardMetric[] = [
  { id: "s1", name: "Receita semanal (R$ mil)", ownerId: "p3", target: "≥ 850", weeks: [{ week: 4, value: "920", metGoal: true }, { week: 5, value: "780", metGoal: false }, { week: 6, value: "890", metGoal: true }, { week: 7, value: "910", metGoal: true }], trend: "up", trendValue: "+4%" },
  { id: "s2", name: "Leads qualificados", ownerId: "p4", target: "≥ 15", weeks: [{ week: 4, value: "18", metGoal: true }, { week: 5, value: "12", metGoal: false }, { week: 6, value: "16", metGoal: true }, { week: 7, value: "14", metGoal: false }], trend: "down", trendValue: "-12%" },
  { id: "s3", name: "Índice de satisfação (%)", ownerId: "p5", target: "≥ 90", weeks: [{ week: 4, value: "92", metGoal: true }, { week: 5, value: "91", metGoal: true }, { week: 6, value: "88", metGoal: false }, { week: 7, value: "93", metGoal: true }], trend: "up", trendValue: "+2%" },
  { id: "s4", name: "Obras no prazo (%)", ownerId: "p5", target: "≥ 85", weeks: [{ week: 4, value: "87", metGoal: true }, { week: 5, value: "82", metGoal: false }, { week: 6, value: "85", metGoal: true }, { week: 7, value: "84", metGoal: false }], trend: "stable", trendValue: "→" },
  { id: "s5", name: "Propostas enviadas", ownerId: "p4", target: "≥ 8", weeks: [{ week: 4, value: "9", metGoal: true }, { week: 5, value: "7", metGoal: false }, { week: 6, value: "10", metGoal: true }, { week: 7, value: "8", metGoal: true }], trend: "up", trendValue: "+14%" },
  { id: "s6", name: "Acidentes de trabalho", ownerId: "p5", target: "0", weeks: [{ week: 4, value: "0", metGoal: true }, { week: 5, value: "1", metGoal: false }, { week: 6, value: "0", metGoal: true }, { week: 7, value: "0", metGoal: true }], trend: "stable", trendValue: "→" },
  { id: "s7", name: "NPS funcionários", ownerId: "p2", target: "≥ 70", weeks: [{ week: 4, value: "68", metGoal: false }, { week: 5, value: "72", metGoal: true }, { week: 6, value: "71", metGoal: true }, { week: 7, value: "74", metGoal: true }], trend: "up", trendValue: "+8%" },
];

export const issues: Issue[] = [
  { id: "i1", title: "Atraso na entrega de materiais do fornecedor X", priority: "HIGH", column: "identify", votes: 4, ownerId: "p5", description: "Fornecedor principal atrasando entregas em 2+ semanas." },
  { id: "i2", title: "Conflito de escopo no projeto Parque das Flores", priority: "HIGH", column: "discuss", votes: 3, ownerId: "p5", description: "Cliente solicitando alterações fora do escopo contratual." },
  { id: "i3", title: "Sistema de ponto com falhas frequentes", priority: "MED", column: "identify", votes: 2, ownerId: "p2", description: "Funcionários reportando erros no registro de horas." },
  { id: "i4", title: "Falta de padronização nos relatórios financeiros", priority: "MED", column: "solve", votes: 5, ownerId: "p3", description: "Cada área usa formato diferente." },
  { id: "i5", title: "Baixa adesão ao novo canal de comunicação", priority: "LOW", column: "discuss", votes: 1, ownerId: "p2", description: "Equipe de obras não está usando o app de comunicação." },
];

export const healthScores: HealthScore[] = [
  { id: "h1", label: "Visão", score: 85, detail: "VTO atualizado, BHAG definido", route: "/vto" },
  { id: "h2", label: "Pessoas", score: 72, detail: "1 posição em aberto, 2 +/-", route: "/people" },
  { id: "h3", label: "Dados", score: 90, detail: "7/7 métricas atualizadas", route: "/scorecard" },
  { id: "h4", label: "Issues", score: 65, detail: "5 issues, 2 HIGH priority", route: "/issues" },
  { id: "h5", label: "Processos", score: 78, detail: "ISO 9001 em andamento", route: "/accountability" },
  { id: "h6", label: "Tração", score: 82, detail: "6/8 rocks on track", route: "/rocks" },
];

export const coreValues = ["Excelência", "Integridade", "Inovação", "Responsabilidade", "Cuidado"];

export const peopleAnalysis: PersonAnalysis[] = [
  { personId: "p1", coreValues: [{ value: "Excelência", rating: "+" }, { value: "Integridade", rating: "+" }, { value: "Inovação", rating: "+" }, { value: "Responsabilidade", rating: "+/-" }, { value: "Cuidado", rating: "+" }], gwc: { getIt: true, wantIt: true, capacity: true }, notes: "Líder visionário, forte em inovação." },
  { personId: "p2", coreValues: [{ value: "Excelência", rating: "+" }, { value: "Integridade", rating: "+" }, { value: "Inovação", rating: "+/-" }, { value: "Responsabilidade", rating: "+" }, { value: "Cuidado", rating: "+" }], gwc: { getIt: true, wantIt: true, capacity: true }, notes: "Excelente integrador, mantém equipe alinhada." },
  { personId: "p3", coreValues: [{ value: "Excelência", rating: "+" }, { value: "Integridade", rating: "+" }, { value: "Inovação", rating: "+/-" }, { value: "Responsabilidade", rating: "+" }, { value: "Cuidado", rating: "+/-" }], gwc: { getIt: true, wantIt: true, capacity: true }, notes: "Precisa desenvolver mais empatia com equipes." },
  { personId: "p4", coreValues: [{ value: "Excelência", rating: "+/-" }, { value: "Integridade", rating: "+" }, { value: "Inovação", rating: "+" }, { value: "Responsabilidade", rating: "+/-" }, { value: "Cuidado", rating: "-" }], gwc: { getIt: true, wantIt: true, capacity: false }, notes: "Atenção: não atende critério mínimo EOS. Capacidade limitada para escalar." },
  { personId: "p5", coreValues: [{ value: "Excelência", rating: "+" }, { value: "Integridade", rating: "+" }, { value: "Inovação", rating: "-" }, { value: "Responsabilidade", rating: "+" }, { value: "Cuidado", rating: "+" }], gwc: { getIt: true, wantIt: true, capacity: true }, notes: "Sólido operacionalmente, precisa abraçar mais inovação." },
];

export const orgChart: OrgNode[] = [
  { id: "o1", role: "Visionário", personId: "p1", parentId: null, responsibilities: ["Estratégia de longo prazo", "Cultura e valores", "Relações-chave com mercado", "Inovação e novos negócios"] },
  { id: "o2", role: "Integrador", personId: "p2", parentId: "o1", responsibilities: ["Gestão da liderança", "Resolução de conflitos", "Execução do plano anual", "Comunicação interna"] },
  { id: "o3", role: "Financeiro", personId: "p3", parentId: "o2", responsibilities: ["Contabilidade e fiscal", "Fluxo de caixa", "Relatórios financeiros", "Orçamento e custos"] },
  { id: "o4", role: "Comercial", personId: "p4", parentId: "o2", responsibilities: ["Prospecção de clientes", "Propostas e contratos", "Relacionamento com clientes", "Pipeline comercial"] },
  { id: "o5", role: "Operações", personId: "p5", parentId: "o2", responsibilities: ["Gestão de obras", "Segurança do trabalho", "Qualidade e ISO", "Logística de materiais"] },
];

export const vtoData = {
  coreValues: ["Excelência em tudo que fazemos", "Integridade nas relações", "Inovação constante", "Responsabilidade com resultados", "Cuidado com pessoas"],
  purpose: "Construir espaços que transformam vidas, com excelência e responsabilidade.",
  niche: "Empreendimentos residenciais de médio e alto padrão na Grande São Paulo.",
  bhag: "Ser a construtora mais admirada de São Paulo até 2035, com faturamento anual de R$500M e NPS acima de 90.",
  vision3yr: {
    revenue: "Faturamento de R$200M/ano",
    items: [
      "15 empreendimentos simultâneos em execução",
      "Certificação ISO 14001 (ambiental) obtida",
      "Expansão para o interior de SP (Campinas e Ribeirão Preto)",
      "Equipe de 800+ colaboradores com turnover < 5%",
    ],
  },
  plan1yr: [
    "Fechar R$80M em novos contratos",
    "Concluir certificação ISO 9001",
    "Implementar ERP integrado em todas as áreas",
    "Reduzir custo de obra em 8% via renegociação de fornecedores",
    "Lançar programa de trainee com 10 posições",
  ],
  strategicIssues: [
    "Como escalar operações sem perder qualidade?",
    "Devemos investir em construção modular/pré-fabricada?",
    "Como atrair talentos de engenharia num mercado competitivo?",
    "Vale expandir para loteamentos ou focar em vertical?",
  ],
};
