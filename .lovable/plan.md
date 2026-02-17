
# Kanban com Drag and Drop — Issues (IDS)

Tornar o quadro Kanban da página Issues interativo, permitindo arrastar cards entre as colunas (Identificar, Discutir, Resolver) usando o mouse.

---

## O que será feito

- Implementar drag and drop nativo (HTML5 Drag and Drop API) nos cards de issues
- Ao arrastar um card de uma coluna para outra, ele muda de coluna automaticamente
- Feedback visual durante o arraste: card com opacidade reduzida, coluna de destino com destaque
- Cursor `grab` nos cards para indicar que são arrastáveis
- Contadores de cada coluna atualizam automaticamente

## Comportamento

1. Usuário clica e segura um card de issue
2. Card fica semi-transparente, cursor muda para "grabbing"
3. Ao passar sobre outra coluna, ela recebe um destaque visual (borda ou fundo)
4. Ao soltar, o card move para a nova coluna
5. Contadores atualizam em tempo real

---

## Detalhes Técnicos

- **Arquivo modificado:** `src/pages/Issues.tsx`
- Usar `useState` com `setIssueList` (atualmente é read-only, precisa ativar o setter)
- Adicionar atributos `draggable`, `onDragStart`, `onDragOver`, `onDrop` nos elementos
- Armazenar o ID do card sendo arrastado via `dataTransfer` ou estado local
- Sem dependência externa — usa a API nativa do navegador
- Estilização com classes Tailwind para os estados de drag (opacidade, borda, escala)
