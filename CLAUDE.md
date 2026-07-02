# CLAUDE.md — syn-be

Plataforma pessoal de acompanhamento da parceria com a **syn.Be** ([syn.be](https://syn.be/)) — laboratório de simulação comportamental (*Syntropic Protocol*) fundado por Douglas Conte. Não é o produto da syn.Be; é uma ferramenta interna para o usuário avaliar o negócio, registrar pesquisa de mercado e organizar o backlog de ações que pode propor ao fundador enquanto sócio ativo.

Ver `docs/analise-estrategica.md` para o diagnóstico completo (produto, mapa competitivo, lacunas do site, backlog de ações) que originou os dados semeados no banco.

## Estrutura do repositório

| Pasta | Tipo | Descrição |
|---|---|---|
| `backend/` | Node.js + Express + TypeScript | API REST sobre Supabase (CRUD de iniciativas, notas de pesquisa e concorrentes) |
| `frontend/` | Next.js 16 (App Router) + Tailwind | Dashboard pessoal que consome a API do backend |
| `supabase/migrations/` | SQL | Schema (`0001_init.sql`) e dados iniciais (`0002_seed.sql`) do backlog/pesquisa |
| `docs/` | Markdown | Análise estratégica viva da syn.Be |

## Modelo de dados

Três tabelas no Postgres (Supabase), prefixadas com `synbe_` porque o projeto é **compartilhado com outros apps do usuário** (mesmo projeto usado por `controle-gastos` e outro app com tabelas `hb_*`). RLS habilitado sem policies — só o `service_role` (usado pelo backend) acessa; não há chave anon exposta ao frontend, que fala apenas com o backend Node.

- **synbe_initiatives** — backlog de ações (`category`: produto | gtm_clientes | investidores | ciencia_credibilidade | parcerias | operacao; `status`: ideia → proposta → em_andamento → concluida/descartada; `priority`: alta/media/baixa).
- **synbe_research_notes** — achados de pesquisa (mercado, concorrência, produto).
- **synbe_competitors** — mapa competitivo (Aaru, Simile, Artificial Societies, etc.).

> Nota: esse projeto Supabase tem 16 tabelas (`hb_*`) com RLS desabilitado, expostas à chave anon — achado de segurança pré-existente, não relacionado ao syn-be. Reportado ao usuário; correção pendente de decisão dele.

## Comandos

```bash
# Backend (API) — porta 4000
cd backend
cp .env.example .env   # preencher SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY
npm install
npm run dev
npm run typecheck

# Frontend — porta 3000
cd frontend
cp .env.local.example .env.local   # NEXT_PUBLIC_API_URL apontando para o backend
npm install
npm run dev
npm run build
```

## Convenções

- Backend: rotas CRUD genéricas via `src/lib/crudRouter.ts` (factory), validação de entrada com `zod` em `src/types.ts`. Novas entidades seguem o mesmo padrão: schema em `types.ts` + `createCrudRouter(table, schema)`.
- Frontend: App Router, Server Components para leitura (fetch direto na API, sem cache — `cache: "no-store"`), Server Actions em `src/app/actions.ts` para mutações (`revalidatePath` após escrever).
- Frontend usa Next.js 16 — antes de mudanças relevantes de padrão (data fetching, actions, caching), conferir `frontend/node_modules/next/dist/docs/01-app/` (API teve mudanças em relação a versões anteriores do Next.js).
- O frontend nunca acessa o Supabase diretamente: toda leitura/escrita passa pelo backend Node (`NEXT_PUBLIC_API_URL`).

## Hospedagem / deploy

- **Frontend**: Vercel, deploy a partir de `frontend/`. Env var: `NEXT_PUBLIC_API_URL` apontando para a URL do backend na Vercel.
- **Backend**: dois modos de execução a partir do mesmo código-fonte (`src/app.ts` monta o Express app sem chamar `listen`):
  - Local/dev contínuo: `src/index.ts` chama `app.listen()` (`npm run dev` / `npm run start`).
  - Vercel (serverless): `api/index.ts` exporta o mesmo `app` como handler; `vercel.json` reescreve todas as rotas para `/api`. Deploy a partir de `backend/` como projeto Vercel separado. Env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `FRONTEND_ORIGIN` (URL do frontend na Vercel).
- **Banco**: Supabase, projeto `wbmcyhqlsiuekbizwcti` ("gustavo1209-ship-it's Project") — compartilhado com outros apps do usuário (limite de 2 projetos gratuitos na organização já estava atingido). Tabelas isoladas com prefixo `synbe_`. Migrations em `supabase/migrations/`.
