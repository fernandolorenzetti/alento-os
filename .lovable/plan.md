

# Redesign Visual + Tradução para Português

Redesenhar toda a interface do Alento seguindo o estilo visual do modelo de referência (dashboard moderno tipo Salezy), usando laranja (#FF6B35) como cor principal no lugar do azul, e traduzir todos os textos em inglês para português.

---

## 1 -- Sidebar (AppSidebar + AppSidebarMobile)

- Adicionar label "Menu Principal" acima da navegacao, com seta de colapso (estilo do modelo)
- Refinar estilo do item ativo: borda esquerda laranja solida (3px), fundo suave laranja/pessego, texto laranja
- Hover mais sutil nos itens
- Traduzir "People Analyzer" para "Analisador de Pessoas"
- Adicionar secao "Ferramentas" abaixo da navegacao principal (separador + label)
- Melhorar avatar do usuario com imagem placeholder circular no rodape
- Badge de notificacao com fundo laranja (ao inves de vermelho destrutivo)

## 2 -- Topbar (Topbar.tsx)

- Adicionar barra de busca central com placeholder "Buscar rocks, pessoas, issues..." e atalho de teclado (visual only)
- Adicionar icones a direita: ajuda (?), notificacoes (sino) e avatar do usuario
- Manter titulo da pagina a esquerda
- Traduzir subtitle "Level 10 Meeting" para "Reuniao Nivel 10"

## 3 -- Dashboard (Dashboard.tsx) -- Redesign Completo

Seguir o layout do modelo:

- **Boas-vindas**: "Bem-vindo de volta, Fernando!" com data atual abaixo
- **Filtro e acoes**: botoes "Este Mes" (dropdown) e "Exportar" no canto superior direito
- **4 Stat Cards em linha**: substituir os 6 health score cards por 4 cards maiores no estilo do modelo:
  - Total de Rocks (icone, valor grande, tendencia "Do ultimo trimestre")
  - Pessoas Avaliadas (icone, valor, tendencia)
  - Metricas no Alvo (icone, valor, tendencia)
  - Issues em Aberto (icone, valor, tendencia)
  - Cada card com: icone laranja no canto, titulo, valor em fonte grande, seta de tendencia verde + "Do ultimo mes"
- **Grafico de barras "Desempenho Trimestral"**: usar Recharts BarChart mostrando dados das 13 semanas com toggle Mensal/Semanal, valor destaque com tendencia
- **Grafico radial "Visao Geral dos Rocks"**: donut chart com % de conclusao geral, stats de vendas/meta abaixo
- **Tabela "Atividade Recente"**: ultimas acoes no sistema (issues resolvidos, rocks atualizados) com busca e filtro

## 4 -- Pagina VTO

- Traduzir subtitle "Vision/Traction Organizer" para "Organizador de Visao e Tracao"

## 5 -- Pagina Rocks

- Traduzir labels "ON TRACK" para "NO PRAZO", "OFF TRACK" para "EM RISCO", "COMPLETE" para "CONCLUÍDO"
- Traduzir "Total", "On Track", "Off Track" nos stats

## 6 -- Pagina Scorecard

- Traduzir "Tendencia" (ja esta), confirmar todos os headers da tabela

## 7 -- Pagina Issues

- Labels "HIGH", "MED", "LOW" traduzir para "ALTA", "MÉDIA", "BAIXA"
- "votos" ja esta, confirmar

## 8 -- Pagina L10 Meeting

- Traduzir subtitle para "Reuniao Nivel 10 · Semana 7"
- "Ao vivo" ja esta
- Traduzir "Tarefas" (ja esta)

## 9 -- Pagina People Analyzer

- Traduzir titulo para "Analisador de Pessoas"
- Traduzir subtitle para "Avaliacao de Valores e GWC"
- Traduzir GWC badges: "ENTENDE" (Get It), "QUER" (Want It), "CAPACIDADE" (Capacity)

## 10 -- Pagina Accountability Chart

- Ja esta em portugues, manter

## 11 -- Estilos Globais (index.css)

- Fundo da area de conteudo mais claro/neutro (tom pessego bem suave, similar ao modelo que usa cinza claro #F8F9FA)
- Cards com sombra mais sutil e bordas mais arredondadas (16px)
- Background do body: gradiente mais suave, quase branco com toque pessego

---

## Detalhes Tecnicos

- **Dashboard**: novo layout com Recharts (BarChart e PieChart/RadialBarChart) para graficos
- **Stat cards**: componente reutilizavel com icone, titulo, valor, tendencia e label
- **Topbar**: expandir para incluir search bar e icones de acao
- **Sidebar**: ajustar secoes com labels de grupo
- **Traducoes**: varrer todos os arquivos para substituir textos em ingles
- Arquivos modificados: `AppSidebar.tsx`, `AppSidebarMobile.tsx`, `Topbar.tsx`, `Dashboard.tsx`, `VTO.tsx`, `Rocks.tsx`, `Issues.tsx`, `L10Meeting.tsx`, `PeopleAnalyzer.tsx`, `index.css`

