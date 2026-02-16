

# Pagina de Login — Alento

Criar uma tela de login moderna e acolhedora, seguindo a identidade visual do Alento (gradiente laranja/pessego, tipografia Space Grotesk + Inter), com protecao de rotas para que o usuario so acesse o sistema apos autenticar.

---

## O que sera criado

### Tela de Login (`/login`)
- Layout dividido em 2 colunas (desktop): formulario a esquerda, painel decorativo a direita
- Mobile: apenas o formulario centralizado
- **Formulario:**
  - Logo "Alento" no topo
  - Titulo: "Bem-vindo de volta"
  - Subtitulo: "Entre na sua conta para continuar"
  - Campo de e-mail
  - Campo de senha (com toggle mostrar/ocultar)
  - Checkbox "Lembrar de mim"
  - Link "Esqueceu a senha?"
  - Botao "Entrar" (laranja #FF6B35, largura total)
- **Painel decorativo (direita):**
  - Fundo com gradiente laranja/pessego
  - Texto motivacional e branding do Alento
  - Ilustracao ou icones decorativos

### Autenticacao Simulada (sem backend)
- Estado global simples (React Context) para controlar se o usuario esta logado
- Login aceita qualquer e-mail/senha (mock) e redireciona para o Dashboard
- Botao de logout na sidebar

### Protecao de Rotas
- Componente `ProtectedRoute` que verifica se o usuario esta autenticado
- Se nao estiver logado, redireciona para `/login`
- A rota `/login` redireciona para `/` se ja estiver logado

---

## Detalhes Tecnicos

- **Arquivos novos:**
  - `src/pages/Login.tsx` — pagina de login
  - `src/contexts/AuthContext.tsx` — contexto de autenticacao mock
  - `src/components/layout/ProtectedRoute.tsx` — wrapper de protecao de rotas

- **Arquivos modificados:**
  - `src/App.tsx` — adicionar rota `/login`, envolver rotas protegidas com `AuthProvider` e `ProtectedRoute`
  - `src/components/layout/AppSidebar.tsx` — adicionar botao de logout no rodape

