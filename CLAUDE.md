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

Três tabelas no Postgres (Supabase), RLS habilitado sem policies — só o `service_role` (usado pelo backend) acessa; não há chave anon exposta ao frontend, que fala apenas com o backend Node.

- **initiatives** — backlog de ações (`category`: produto | gtm_clientes | investidores | ciencia_credibilidade | parcerias | operacao; `status`: ideia → proposta → em_andamento → concluida/descartada; `priority`: alta/media/baixa).
- **research_notes** — achados de pesquisa (mercado, concorrência, produto).
- **competitors** — mapa competitivo (Aaru, Simile, Artificial Societies, etc.).

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

- **Frontend**: Vercel.
- **Backend**: é um servidor Express persistente (não serverless) — não roda nativamente na Vercel. Precisa de um host que suporte processo Node contínuo (ex.: Railway, Render, Fly.io) ou ser adaptado para função serverless antes de ir para a Vercel. Decisão ainda em aberto — ver conversa com o usuário antes de escolher.
- **Banco**: Supabase (projeto dedicado a este app, migrations em `supabase/migrations/`).
