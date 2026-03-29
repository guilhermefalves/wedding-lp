# CLAUDE.md

Este arquivo orienta o Claude Code (claude.ai/code) ao trabalhar com o código deste repositório.

## Visão Geral

Landing page do casamento de Noemy & Guilherme (17 de abril de 2026). Feita com React 18 + Vite + TypeScript, deploy na Vercel.

## Comandos

- `yarn dev` — servidor de desenvolvimento na porta 3000
- `yarn build` — build de produção no diretório `build/`
- `yarn lint` — lint com Biome
- `yarn lint:fix` — corrige problemas de lint automaticamente
- `yarn format` — formata com Biome
- `yarn check` — lint + format combinados
- `yarn check:fix` — corrige lint + format automaticamente

## Arquitetura

- **Rotas**: React Router DOM v7 com `BrowserRouter` em `src/App.tsx`. Vercel redireciona todas as rotas para `/` (SPA). Rotas atuais: `/` (Home), `/convite` (Convite).
- **Estilização**: Tailwind CSS v4 via `src/index.css` (output compilado) + `src/styles/globals.css` (tokens de tema e utilitários customizados). Tema escuro por padrão.
- **Componentes UI**: Padrão shadcn/ui em `src/components/ui/` (Button, Input, Textarea, Label, RadioGroup, Sonner). Usa `class-variance-authority`, `clsx`, `tailwind-merge` via `src/components/ui/utils.ts`.
- **Alias de caminho**: `@/` aponta para `src/` (configurado em `vite.config.ts`).
- **Fontes**: Playfair Display (títulos) e Cormorant Garamond (corpo), carregadas em `index.html`. Classes utilitárias `.font-display` e `.font-body` definidas em `globals.css`.
- **Constantes**: Datas, local, nomes dos noivos, cronograma, galeria e RSVP centralizados em `src/config/constants.ts`.
- **Animações**: Biblioteca `motion` (Framer Motion).
- **Ícones**: `lucide-react`.

## Deploy

- **Vercel**: Projeto `wedding-lp` em https://vercel.com/guilhermefalves-projects/wedding-lp
- Branch de produção: `master`. Branch de desenvolvimento: `dev`.
- Build output: `build/`. O `vercel.json` configura rewrite de todas as rotas para `/` (SPA).

## Convenções de Estilo

- Biome: aspas duplas, trailing commas, ponto e vírgula, indentação de 2 espaços, 80 caracteres por linha.
- Paleta de cores: verde oliva (`--accent-olive: #6b7f39`), terracota, bege — definidas como custom properties CSS em `globals.css` e também em `src/config/constants.ts`.
- Idioma: textos da interface em português brasileiro.
