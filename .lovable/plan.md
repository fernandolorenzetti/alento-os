

# Adicionar Formulário de Preenchimento de Indicadores abaixo do Scorecard

Adicionar uma segunda tabela/formulário abaixo da tabela atual do Scorecard para permitir o preenchimento de novos indicadores.

---

## O que será criado

Uma nova seção abaixo da tabela de indicadores existente, com uma tabela de preenchimento contendo os campos mínimos para cadastrar um novo indicador:

- **Nome do indicador** (campo de texto)
- **Responsável** (dropdown com as pessoas do seed)
- **Meta** (campo de texto/número)
- **Semana 4 a 7** (campos numéricos para valores semanais)

A tabela terá uma linha de formulário com inputs inline (estilo planilha) e um botão "+ Adicionar Indicador" para inserir a linha preenchida na tabela principal.

---

## Layout

```text
┌──────────────────────────────────────────────────┐
│  Tabela atual do Scorecard (somente leitura)     │
│  (já existente, sem alterações)                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  NOVO INDICADOR                                  │
│  ──────────────────────────────────────────────── │
│  Indicador  │ Responsável │ Meta │ S4 │ S5 │ ... │
│  [input]    │ [select]    │[inp] │[n] │[n] │     │
│                              [+ Adicionar]       │
└──────────────────────────────────────────────────┘
```

---

## Detalhes Técnicos

- **Arquivo modificado:** `src/pages/Scorecard.tsx`
- Adicionar estado local (`useState`) para gerenciar a lista de métricas (inicializada com seed data) e os campos do formulário
- Card separado abaixo do scorecard com título "Novo Indicador"
- Inputs com estilo inline dentro de uma tabela, seguindo a mesma estrutura de colunas do scorecard (Indicador, Meta, S4-S7)
- Select para o responsável usando as pessoas do seed
- Botão "Adicionar" com estilo laranja accent
- Ao adicionar, a nova métrica aparece na tabela principal acima (tendência calculada como "estável" por padrão)
- Validação simples: nome e meta obrigatórios
