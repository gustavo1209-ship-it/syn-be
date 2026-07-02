-- Seed inicial: backlog de ações e pesquisa de mercado da análise estratégica
-- (ver docs/analise-estrategica.md na raiz do repositório)

insert into initiatives (title, description, category, priority) values
  ('Mini-simulador público interativo', 'Cenário genérico pré-configurado onde o visitante testa o Syntropic Protocol em minutos: gera lead qualificado e demonstra a tecnologia na prática.', 'produto', 'alta'),
  ('Whitepaper metodológico público', 'Publicar documento citando as fontes científicas mencionadas no site (Stanford/Cambridge/Nature) para credibilidade e SEO.', 'produto', 'media'),
  ('Avaliar estrutura de tiers', 'Definir oferta self-serve vs. enterprise, usando como referência Minds (self-serve) e Aaru (enterprise).', 'produto', 'media'),
  ('Definir ICP inicial', 'Hipótese: empresas médias/grandes no Brasil em transformação (fusão, RTO, troca de liderança, crise reputacional), onde o custo de errar a adesão cultural é alto.', 'gtm_clientes', 'alta'),
  ('Fechar 3-5 pilotos', 'Mesmo gratuitos, para gerar os primeiros cases públicos e prova social.', 'gtm_clientes', 'alta'),
  ('Criar página de pricing/engajamento', 'Mesmo que "sob consulta", para reduzir fricção comercial no primeiro contato.', 'gtm_clientes', 'media'),
  ('Mapear canal via consultorias de mudança/RH', 'Consultorias de gestão de mudança e RH estratégico como parceiros de distribuição, não concorrentes.', 'parcerias', 'baixa'),
  ('Preparar deck de pré-seed/seed', 'Três pilares: nicho defensável (interno vs. externo), validação (92% correspondência / 29 testes), fundador com domínio de mercado.', 'investidores', 'alta'),
  ('Mapear fundos e anjos com tese aderente', 'Future of work / behavioral AI / enterprise AI no Brasil e LatAm (ex.: Canary, DOMO Invest, Norte Ventures) e referências internacionais (Kindred Capital).', 'investidores', 'media'),
  ('Avaliar aceleradoras de deep tech comportamental', 'Mesmo tipo de programa que apoiou Artificial Societies e Simile.', 'investidores', 'baixa'),
  ('Publicar Conselho Científico Consultivo', 'Nomes e afiliações reais dos advisors/PhDs associados, se ainda não divulgado publicamente.', 'ciencia_credibilidade', 'alta'),
  ('Transformar testes de aplicação em relatório técnico', 'Os "29 testes de aplicação" citados no site viram um relatório técnico citável.', 'ciencia_credibilidade', 'media'),
  ('Assumir estruturação comercial/GTM inicial', 'ICP, funil e pricing: área com menor sobreposição ao perfil do fundador (branding/cultura).', 'gtm_clientes', 'alta'),
  ('Liderar preparação de material para investidores', 'Deck, mapeamento de fundos e outreach inicial.', 'investidores', 'alta'),
  ('Trazer contatos da rede para piloto real', '1-2 contatos próprios para primeira validação e primeiro case.', 'gtm_clientes', 'media'),
  ('Manter esta plataforma como sala de acompanhamento', 'Registrar decisões, propostas e status da parceria ao longo do tempo.', 'operacao', 'media');

insert into research_notes (title, content, category, source_url) values
  ('Diagnóstico do produto e posicionamento', 'Syntropic Protocol: simula comportamento organizacional interno (cultura, adesão, execução) a partir de agentes sintéticos, diferente da maioria do mercado que foca em pesquisa de mercado/consumidor externo. Fundador Douglas Conte tem bagagem em cultura organizacional e branding comportamental (Qore.me), não em GTM enterprise de software — possível área de contribuição do sócio.', 'produto', null),
  ('Lacunas identificadas no site (jul/2026)', 'Sem cases públicos, sem pricing, fontes científicas citadas sem links verificáveis, único CTA é WhatsApp (sem demo/waitlist), site só em português, sem menção a segurança/privacidade de dados organizacionais (relevante para LGPD e vendas enterprise).', 'produto', 'https://syn.be/'),
  ('Aaru — concorrente enterprise', 'Simulação comportamental enterprise, parceria com EY, ~90% de correlação com pesquisa real, contratos de 6-7 dígitos, valuation ~US$1B (Series A Redpoint, dez/2025).', 'concorrencia', 'https://techcrunch.com/2025/12/05/ai-synthetic-research-startup-aaru-raised-a-series-a-at-a-1b-headline-valuation/'),
  ('Simile — spinout de Stanford', 'US$100M captados (Index Ventures), fundado pelo time de Stanford que criou o conceito de "generative agents" (Joon Park, Michael Bernstein, Percy Liang).', 'concorrencia', 'https://techfundingnews.com/100m-for-stanford-spinout-simile-ai-that-simulates-human-decisions/'),
  ('Artificial Societies — o mais próximo do nicho da syn.Be', '2,5M+ personas sintéticas; simula reação de investidores, "policy influencers" e buyer committees para empresas Fortune 500. Backing: Y Combinator e Kindred Capital. É o concorrente mapeado com maior potencial de invadir o território de "stakeholders internos" da syn.Be.', 'concorrencia', 'https://www.ycombinator.com/companies/artificial-societies'),
  ('Mercado de synthetic research em 2026', 'Setor já atraiu mais de US$1,5B em capital de risco, com clientes como CVS Health, BlackRock, EY e Microsoft. Padrão maduro é híbrido: sintético para iteração rápida, respondentes reais para a decisão final.', 'mercado', 'https://askditto.io/news/synthetic-research-platforms-the-2026-market-map');

insert into competitors (name, url, positioning, funding, notes) values
  ('Aaru', 'https://aaru.com/', 'Previsão comportamental enterprise, parceria EY', '~US$1B valuation (Series A, Redpoint)', 'Contratos de 6-7 dígitos, ciclo de venda longo'),
  ('Simile', 'https://simile.ai/', 'Simulação de decisões humanas, criadores do conceito "generative agents"', 'US$100M (Index Ventures)', 'Maior rodada única do setor; time acadêmico de Stanford'),
  ('Artificial Societies', null, 'Simula reação de investidores, policy influencers e buyer committees para F500', 'YC + Kindred Capital', 'Concorrente mais próximo do nicho "stakeholders internos" da syn.Be'),
  ('Synthetic Users / Minds / Ditto', null, 'Pesquisa de UX/produto self-serve', 'Seed / self-serve', 'Mercado mid-market, menos enterprise, menor barreira de entrada');
