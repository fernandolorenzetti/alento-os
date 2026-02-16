

# Alento — Sistema Operacional para Empresas de Alto Desempenho

Sistema de gestão baseado no EOS (Entrepreneurial Operating System) para consultores e empresas brasileiras, com dados mockados da "Construtora Lorenzetti".

---

## Fase 1 — Design System & Layout Global

- Configurar paleta de cores (gradiente laranja/pêssego, accent #FF6B35, tons de cinza)
- Configurar tipografia: Inter (body), fonte display para headings, JetBrains Mono (dados/números)
- Bordas arredondadas 12px/8px/6px, sombras suaves, espaçamento 4px grid
- Sidebar fixa (240px) com logo "Alento", company badge ("Construtora Lorenzetti · Q1 2026 · Semana 7/13"), navegação com 8 módulos, estados ativo/hover com accent laranja
- Topbar com título da página, subtítulo e botões de ação
- Content area transparente sobre gradiente, max-width 1400px
- Responsividade: sidebar colapsável em tablet, drawer em mobile

---

## Fase 2 — Dashboard

- Grid de 6 Health Score Cards (Visão, Pessoas, Dados, Issues, Processos, Tração) com scores dinâmicos e cores condicionais (verde ≥80, laranja 60-79, vermelho <60)
- Quarter Banner com info do trimestre atual, progresso semanal e stats de Rocks
- Resumo dos 3 principais Rocks com status badges e progress bars
- Scorecard resumido (top 5 métricas com dot indicators verde/vermelho)
- Lista compacta de Issues em aberto com priority badges

---

## Fase 3 — VTO (Vision/Traction Organizer)

- Layout 2 colunas com 6 blocos: Valores Fundamentais, Propósito & Causa, BHAG (10 anos), Visão 3 anos, Plano 1 ano, Questões Estratégicas
- Conteúdo editável inline com autosave
- Dados seed com valores, propósito e metas da Construtora Lorenzetti

---

## Fase 4 — Rocks (Metas Trimestrais)

- Quarter Banner com stats do trimestre
- Grid de Rock Cards com avatar do responsável, status badge (ON/OFF TRACK, COMPLETE), progress bar e metadata
- Modal/drawer de detalhes: descrição, milestones, comentários, histórico de progresso
- Filtros por responsável e status
- Botão "+ Adicionar Rock" com validação (máx 5 por pessoa)
- Seed: 8 rocks distribuídos entre 5 líderes

---

## Fase 5 — Scorecard (Indicadores Semanais)

- Tabela full-width com colunas: Indicador + responsável, Meta, últimas 4 semanas, Tendência
- Valores em JetBrains Mono com cores condicionais (verde = meta atingida, vermelho = não)
- Ícones de tendência (↑↓→) coloridos
- Edição inline nas células de valor
- Seed: 7 métricas semanais

---

## Fase 6 — Issues / IDS (Identificar · Discutir · Resolver)

- Kanban 3 colunas com cores distintas (azul, laranja, verde)
- Issue cards com título, priority badge (HIGH/MED/LOW) e contagem de votos
- Drag & drop entre colunas
- Modal de detalhes: descrição, discussão em thread, ação definida, responsável, upvote
- Seed: 5 issues distribuídos nas colunas

---

## Fase 7 — Reunião L10 (Level 10 Meeting)

- Layout 2 colunas: agenda (70%) + sidebar (30%)
- Agenda com 7 itens padrão EOS (Check-in, Scorecard, Rocks, Headlines, Todo, IDS, Conclusão) com checkboxes e tempos
- Timer grande com controles (iniciar/pausar/reset), display em Cal Sans 56px
- Lista de tarefas da reunião com checkboxes
- Avaliação da reunião com 10 estrelas clicáveis e score exibido
- Lista de participantes com status presente/ausente

---

## Fase 8 — People Analyzer

- Grid de Person Cards com avatar, nome, cargo
- Ratings de Core Values (+ / +/- / -) com cores verde/laranja/vermelho
- GWC badges (Get it, Want it, Capacity) com ✓/✗
- Destaque visual para pessoas que não atendem critério EOS (borda vermelha)
- Modal de detalhes com avaliação completa e notas
- Seed: 5 pessoas da liderança avaliadas

---

## Fase 9 — Accountability Chart (Organograma)

- Organograma hierárquico visual: Visionário → Integrador → Líderes funcionais
- Nodes com role, nome e conectores visuais
- Node do Visionário destacado com borda laranja
- Card de responsabilidades por área em grid 2 colunas
- Edição de nodes e responsabilidades
- Seed: estrutura da Construtora Lorenzetti

---

## Notas Técnicas

- **Frontend only** nesta fase: todos os dados são mockados com seed data da Construtora Lorenzetti (sem backend/Supabase por enquanto)
- **State management** via React Context ou Zustand para dados editáveis
- **Recharts** para gráficos de tendência no Scorecard
- **Lucide Icons** para toda iconografia
- **Animações suaves** (transitions 0.2s, fade-in 0.3s, progress bars animadas)
- **Skeleton loading states** e empty states com ilustrações

