# MVP SCOPE - Habit Coach AI

## 1. Visão Geral do MVP

Este documento define claramente o que está **dentro** e **fora** do escopo do MVP (Minimum Viable Product) do Habit Coach AI. O objetivo do MVP é validar a proposta de valor principal: **IA com personalidades famosas para coaching de hábitos e metas**.

### Objetivos do MVP:
1. Validar se usuários se engajam com personalidades de IA
2. Testar se decomposição automática de metas via MCP é útil
3. Verificar se usuários mantêm hábitos melhor do que com apps tradicionais
4. Coletar feedback para iteração
5. Validar modelo de negócio freemium

### Critérios de Sucesso:
- 100+ usuários ativos nos primeiros 30 dias
- Taxa de retenção D7 > 40%
- Taxa de conclusão de hábitos > 60%
- NPS > 50
- Pelo menos 5% de conversão Free → Pro após 30 dias

---

## 2. O Que ESTÁ no MVP

### 2.1 Core Features (MUST HAVE)

#### ✅ Sistema de Hábitos
**Prioridade:** MUST  
**Justificativa:** É o coração do produto. Sem rastreamento eficaz de hábitos, não há produto.

**Funcionalidades:**
- Criar hábito com nome, descrição, frequência (diária, dias específicos, X vezes/semana)
- Definir horário preferencial para lembretes
- Marcar hábito como completo (hoje + até 7 dias atrás)
- Visualizar lista de hábitos do dia (checklist)
- Ver detalhes de hábito individual:
  - Calendário/heatmap (últimos 90 dias)
  - Streak atual e recorde
  - Taxa de conclusão (30/60/90 dias)
  - Gráfico de tendência
- Editar ou arquivar hábito
- Máximo 3 hábitos ativos (Free), ilimitado (Pro)

**Critérios de Aceitação:**
- Usuário cria hábito em <30 segundos
- Marcar hábito como completo é instantâneo (<300ms)
- Streak é calculado corretamente (100% de acurácia)
- Dashboards carregam em <2 segundos

---

#### ✅ Sistema de Metas
**Prioridade:** MUST  
**Justificativa:** Diferencia de apps básicos de hábitos. Metas com decomposição automática é valor agregado.

**Funcionalidades:**
- Criar meta com título, descrição, data limite, categoria
- Categorias: Carreira, Saúde, Estudos, Pessoal, Finanças, Outro
- Adicionar subtarefas manualmente
- **Gerar subtarefas automaticamente via MCP (IA)**
- Marcar subtarefas como completas
- Visualizar progresso (% de subtarefas completas)
- Lista de metas ativas, filtradas e ordenadas
- Ver detalhes de meta:
  - Barra de progresso
  - Lista de subtarefas (ordenadas)
  - Dias restantes até deadline
- Completar ou arquivar meta
- Máximo 1 meta ativa (Free), ilimitado (Pro)

**Critérios de Aceitação:**
- IA gera subtarefas úteis em >80% dos casos (validado com testes)
- Progresso de meta atualiza em tempo real ao completar subtarefa
- Alertas de prazo funcionam (7, 3, 1 dia antes)

---

#### ✅ IA com Personalidades Famosas
**Prioridade:** MUST  
**Justificativa:** É o principal diferencial competitivo. Sem isso, não há proposta de valor única.

**Personalidades Disponíveis (MVP):**
1. **Mestre Yoda** (Sábio e Encorajador)
2. **General Motivador** (Direto e Intenso)
3. **Mentor Empático** (Gentil e Compreensivo)

**Funcionalidades:**
- Escolher personalidade no onboarding ou configurações
- Receber mensagens motivacionais ao:
  - Completar hábito
  - Completar subtarefa
  - Alcançar streak milestone (7, 14, 30, 60, 90 dias)
  - Completar meta
  - Falhar em hábito (mensagem encorajadora, não punitiva)
- Mensagens têm trejeitos característicos de cada personalidade
- Chat livre com IA:
  - Fazer perguntas sobre progresso
  - Pedir dicas
  - Análise de padrões
- Análise semanal automática:
  - Resumo de performance
  - Padrões identificados
  - Sugestões de foco

**Critérios de Aceitação:**
- >70% dos usuários interagem com IA pelo menos 3x/semana
- Mensagens são geradas em <2 segundos
- Usuários dão feedback positivo (👍) em >60% das mensagens
- Personalidades são claramente distintas (validado em testes qualitativos)

**Limitações Free:**
- Apenas 1 personalidade disponível (escolhida no onboarding)
- Pro: Todas as personalidades + pode trocar a qualquer momento

---

#### ✅ Decomposição Automática de Metas via MCP
**Prioridade:** MUST  
**Justificativa:** Diferencial técnico que reduz fricção no planejamento de metas.

**Funcionalidades:**
- Ao criar meta, botão "Gerar subtarefas com IA"
- IA analisa título + descrição e sugere 4-8 subtarefas
- Cada subtarefa tem título claro e data limite sugerida
- Usuário pode:
  - Aceitar todas
  - Aceitar individualmente
  - Editar sugestões
  - Rejeitar e gerar novamente (máximo 3 tentativas)
- Subtarefas aceitas são adicionadas automaticamente

**Critérios de Aceitação:**
- Geração demora <10 segundos
- Subtarefas são específicas e acionáveis (não genéricas)
- >80% dos usuários usam a feature ao criar metas
- Feedback qualitativo positivo sobre utilidade

**Limitações Free:**
- Não disponível (feature exclusiva Pro)

---

#### ✅ Dashboards de Visualização
**Prioridade:** MUST  
**Justificativa:** Usuários precisam ver progresso de forma clara para manter motivação.

**Dashboards Incluídos:**

1. **Dashboard Principal (Home)**
   - Hábitos de hoje (checklist)
   - Top 3 metas prioritárias
   - Mensagem motivacional da IA
   - Streak mais longo atual
   - Taxa de conclusão da semana

2. **Dashboard de Hábitos**
   - Lista de hábitos ativos
   - Estatísticas básicas (streak, taxa de conclusão)
   - Ordenação e filtros simples

3. **Dashboard de Metas**
   - Lista de metas ativas
   - Progresso visual (%)
   - Filtro por categoria
   - Ordenação por prazo ou progresso

4. **Detalhes de Hábito**
   - Calendário/heatmap (90 dias)
   - Gráfico de tendência
   - Estatísticas detalhadas

5. **Detalhes de Meta**
   - Barra de progresso
   - Lista de subtarefas
   - Timeline (criação → hoje → deadline)

**Critérios de Aceitação:**
- Dashboards carregam em <2 segundos
- Dados são precisos (100% de acurácia)
- Design é limpo e fácil de escanear
- Responsivo (mobile, tablet, desktop)

---

#### ✅ Sistema de Notificações
**Prioridade:** SHOULD (importante mas não bloqueante)  
**Justificativa:** Notificações aumentam engajamento e conclusão de hábitos.

**Tipos de Notificação:**
1. Lembrete de hábito (no horário configurado)
2. Celebração de streak (milestones)
3. Alerta de meta próxima do prazo (7, 3, 1 dia antes)
4. Resumo semanal disponível
5. Mensagens contextuais da IA

**Funcionalidades:**
- Configurar horário de lembrete por hábito
- Ativar/desativar notificações globalmente
- Ativar/desativar por tipo
- Modo silencioso (horário sem notificações)
- Interagir com notificação (marcar hábito como completo)

**Tecnologia:**
- Web Push API (notificações no navegador)
- PWA installable para notificações mesmo com app fechado

**Critérios de Aceitação:**
- Notificações são enviadas no horário correto (±1 minuto)
- Usuário pode controlar granularmente o que recebe
- Não há spam (máximo 10 notificações/dia)

---

#### ✅ Autenticação e Conta
**Prioridade:** MUST  
**Justificativa:** Essencial para qualquer SaaS.

**Funcionalidades:**
- Registro via email + senha
- Login via email + senha
- Recuperação de senha
- Validação de email (link de confirmação)
- Editar perfil (nome, email, avatar)
- Deletar conta (com confirmação)

**Tecnologia:**
- Supabase Auth

**Critérios de Aceitação:**
- Registro + login funcionam sem bugs
- Senhas são seguras (hash, mínimo 8 caracteres)
- Usuário pode recuperar senha facilmente

---

#### ✅ Onboarding
**Prioridade:** MUST  
**Justificativa:** Primeira impressão é crítica para retenção.

**Funcionalidades:**
- Tela 1: Boas-vindas + Explicação breve
- Tela 2: Escolher personalidade de IA (com previews)
- Tela 3: Criar primeiro hábito (guided)
- Tela 4: (Opcional) Criar primeira meta
- Redirecionar para Dashboard

**Critérios de Aceitação:**
- Onboarding leva <2 minutos
- >80% dos usuários completam onboarding
- Usuário pode pular etapas

---

#### ✅ Sistema de Planos (Free vs Pro)
**Prioridade:** MUST  
**Justificativa:** Necessário para validar modelo de negócio.

**Plano Free:**
- Máximo 3 hábitos ativos
- Máximo 1 meta ativa
- 1 personalidade de IA (escolhida no onboarding)
- Dashboards básicos
- Análise semanal apenas
- Notificações básicas

**Plano Pro (R$ 29,90/mês):**
- Hábitos ilimitados
- Metas ilimitadas
- Todas as personalidades de IA
- Decomposição automática de metas via MCP
- Análises sob demanda
- Notificações ilimitadas

**Funcionalidades:**
- Visualizar plano atual
- Comparação de planos (modal)
- Upgrade para Pro (botão CTA)
- Sistema de pagamento (Stripe ou mock para MVP)
- Downgrade (cancelar assinatura)

**Critérios de Aceitação:**
- Limites do Free são respeitados (bloqueios funcionam)
- Upgrade para Pro funciona (mesmo que pagamento seja mock)
- Usuário entende claramente diferença entre planos

---

### 2.2 Features Secundárias (SHOULD HAVE)

#### ✅ Exportação de Dados
**Prioridade:** SHOULD  
**Justificativa:** LGPD compliance. Usuário deve poder exportar seus dados.

**Funcionalidades:**
- Botão "Exportar meus dados" (JSON)
- Inclui: Hábitos, Metas, Subtarefas, Histórico de conclusões, Conversas com IA

---

#### ✅ Configurações de Preferências
**Prioridade:** SHOULD  
**Justificativa:** Personalização básica melhora experiência.

**Funcionalidades:**
- Escolher primeiro dia da semana (Domingo/Segunda)
- Escolher dia da análise semanal (Domingo/Segunda)
- Toggle de mensagens automáticas da IA

---

### 2.3 Qualidade e Infraestrutura (MUST HAVE)

#### ✅ Responsividade
- Mobile-first design
- Funcional em: Mobile (iOS/Android), Tablet, Desktop
- Breakpoints: 640px, 768px, 1024px

#### ✅ Performance
- Dashboard carrega em <2s (4G)
- Operações de criar/editar salvam em <1s
- IA responde em <5s

#### ✅ Segurança
- HTTPS em todas as requisições
- RLS (Row Level Security) no Supabase
- Senhas hash com bcrypt
- Sessões expiram após 7 dias

#### ✅ Acessibilidade Básica
- Contraste mínimo WCAG AA
- Navegação por teclado funcional
- ARIA labels em elementos interativos

#### ✅ Monitoramento
- Logs de erros (Sentry ou similar)
- Analytics básico (Posthog ou similar)
- Monitoramento de performance (Web Vitals)

---

## 3. O Que NÃO ESTÁ no MVP

### 3.1 Features para Versões Futuras

#### ❌ Gamificação Avançada
**Por quê não agora:** Pode distrair do core value (IA + coaching). Validar primeiro se usuários se engajam com o básico.

**O que seria:**
- Sistema de pontos (XP)
- Badges/conquistas
- Níveis
- Rankings públicos
- Desafios entre usuários

**Quando adicionar:** Versão 2.0, após validar MVP

---

#### ❌ Integração com WhatsApp/SMS
**Por quê não agora:** Complexidade técnica (API WhatsApp Business, custos de SMS). Web Push é suficiente para validação.

**O que seria:**
- Lembretes via WhatsApp
- Mensagens da IA via WhatsApp
- Responder mensagens da IA via WhatsApp

**Quando adicionar:** Se usuários pedirem ativamente (validar demanda)

---

#### ❌ Dashboards Preditivos com ML
**Por quê não agora:** Requer volume de dados significativo. Prematura para MVP.

**O que seria:**
- Previsão de sucesso de metas (probabilidade de completar)
- Previsão de quando usuário vai quebrar streak
- Recomendação de melhor horário para hábitos (baseado em ML)

**Quando adicionar:** 6-12 meses após lançamento, quando houver dados suficientes

---

#### ❌ Compartilhamento Social
**Por quê não agora:** Não é core value. Pode ser adicionado depois se houver demanda.

**O que seria:**
- Compartilhar conquistas (streaks, metas completas) em redes sociais
- Perfil público
- Feed de atividades de amigos

**Quando adicionar:** Se metrics de engajamento estiverem sólidas

---

#### ❌ Comunidade/Grupos de Accountability
**Por quê não agora:** Complexidade de moderação e desenvolvimento. Foco é IA, não comunidade.

**O que seria:**
- Criar grupos com amigos
- Compartilhar progresso dentro de grupos
- Desafios em grupo
- Chat entre membros

**Quando adicionar:** Versão 3.0+

---

#### ❌ Integração com Wearables
**Por quê não agora:** APIs complexas, requer parceria/acesso. Não é prioritário.

**O que seria:**
- Sincronizar com Fitbit, Apple Watch, Garmin
- Hábitos de exercício detectados automaticamente
- Sono, passos, calorias integrados

**Quando adicionar:** Se houver demanda clara de mercado

---

#### ❌ Integração com Calendário
**Por quê não agora:** Não é essencial para core value. Pode ser adicionado depois.

**O que seria:**
- Sincronizar metas/subtarefas com Google Calendar, Outlook
- Bloquear tempo no calendário para hábitos
- Ver hábitos no calendário externo

**Quando adicionar:** Versão 2.0

---

#### ❌ Modo Offline Completo
**Por quê não agora:** PWA básico é suficiente. Offline completo com sync é complexo.

**O que seria:**
- Funcionar completamente offline
- Sincronizar quando voltar online
- Resolver conflitos de dados

**Quando adicionar:** Se usuários pedirem ativamente

---

#### ❌ API Pública
**Por quê não agora:** Não há demanda validada. Foco é produto B2C, não plataforma.

**O que seria:**
- API REST/GraphQL pública
- Webhooks
- Integrações com Zapier, Make, etc.

**Quando adicionar:** Se houver demanda de desenvolvedores/empresas

---

#### ❌ Mais de 3 Personalidades de IA
**Por quê não agora:** 3 é suficiente para validar conceito. Adicionar mais aumenta complexidade de prompts.

**O que seria:**
- 10-100 personalidades (coaches famosos, personagens de ficção, estilos variados)
- IA customizável (usuário define tom e estilo)

**Quando adicionar:** Se usuários amarem as 3 iniciais e pedirem mais

---

#### ❌ Journaling Integrado
**Por quê não agora:** Não é core value. Há apps dedicados para isso.

**O que seria:**
- Espaço para journaling diário
- IA analisa journal e correlaciona com hábitos
- Prompts de reflexão

**Quando adicionar:** Se dados mostrarem que usuários querem isso

---

#### ❌ Templates de Hábitos e Metas
**Por quê não agora:** Prematura. Validar primeiro se usuários criam hábitos/metas facilmente do zero.

**O que seria:**
- Biblioteca de hábitos comuns (ex: "Meditar 10min", "Ler 30min")
- Templates de metas por objetivo (ex: "Emagrecer 5kg", "Aprender Python")
- One-click para adicionar

**Quando adicionar:** Versão 1.5

---

#### ❌ Análise de Humor/Energia
**Por quê não agora:** Adiciona fricção (usuário precisa registrar humor diário). Foco em hábitos/metas.

**O que seria:**
- Registrar humor diário (escala 1-10)
- Correlacionar humor com hábitos
- Insights: "Você medita mais quando está triste"

**Quando adicionar:** Se houver interesse validado

---

#### ❌ Login Social (Google, Apple)
**Por quê não agora:** Email + senha é suficiente para MVP. Social login pode ser adicionado depois.

**Quando adicionar:** Se conversão no onboarding for baixa

---

#### ❌ Tema Dark Mode
**Por quê não agora:** Light mode é suficiente para MVP. Dark mode requer design e testes adicionais.

**Quando adicionar:** Versão 1.5

---

#### ❌ Multi-idiomas
**Por quê não agora:** MVP foca em PT-BR. Internacionalização é complexa.

**Quando adicionar:** Se houver demanda internacional

---

#### ❌ Modo Família/Times
**Por quê não agora:** Complexidade de permissões e privacidade. Foco é B2C individual.

**O que seria:**
- Pais acompanham hábitos de filhos
- Managers acompanham times
- Permissões granulares

**Quando adicionar:** Pivot para B2B ou B2B2C

---

### 3.2 Limitações Técnicas Aceitas no MVP

#### ⚠️ Web Push Apenas (Não WhatsApp/SMS)
**Impacto:** Menor taxa de abertura de notificações. Aceitável para validação.

#### ⚠️ Polling ao invés de Realtime WebSockets
**Impacto:** Updates não são instantâneos (refresh a cada 30s-1min). Aceitável para MVP.
**Implementação:** React Query com `refetchInterval` ou SWR.

#### ⚠️ Análise Semanal Automática Apenas (Não Sob Demanda no Free)
**Impacto:** Usuários Free não podem pedir análise quando quiserem. Aceitável para diferenciar Pro.

#### ⚠️ Histórico de Hábitos Limitado a 90 Dias (Visual)
**Impacto:** Dados são salvos indefinidamente, mas visualização mostra apenas 90 dias. Aceitável para performance.

#### ⚠️ Cache de Mensagens da IA Não Implementado
**Impacto:** Custo de API pode ser maior. Aceitável para MVP, otimizar depois se necessário.

#### ⚠️ Sem Testes Automatizados Completos
**Impacto:** Depende de testes manuais para QA. Aceitável para MVP, implementar depois.

---

## 4. Justificativas das Decisões de Escopo

### 4.1 Por Que Incluir Decomposição de Metas via MCP?
**Decisão:** Incluir no MVP, mas apenas para usuários Pro.

**Justificativa:**
- É um diferencial técnico claro (outros apps não fazem isso)
- Reduz fricção significativa (planejar metas é difícil)
- Valida uso de IA além de mensagens motivacionais
- Sendo Pro-only, cria incentivo de conversão

**Risco:** IA pode gerar subtarefas ruins. **Mitigação:** Permitir regenerar (máximo 3x) e sempre permitir edição manual.

---

### 4.2 Por Que Apenas 3 Personalidades no MVP?
**Decisão:** Limitar a 3 personalidades bem definidas.

**Justificativa:**
- 3 é suficiente para validar conceito (variedade sem complexidade)
- Cada personalidade requer design cuidadoso de prompts
- Foco em qualidade vs. quantidade
- Se usuários amarem, adicionar mais é fácil

---

### 4.3 Por Que Não Gamificação?
**Decisão:** Deixar para versão futura.

**Justificativa:**
- Gamificação pode distrair do core value (IA + coaching)
- Habitica já faz gamificação muito bem - difícil competir nisso
- Queremos validar se IA motivacional é suficiente por si só
- Gamificação pode ser adicionada depois se necessário

---

### 4.4 Por Que Não WhatsApp?
**Decisão:** Apenas Web Push no MVP.

**Justificativa:**
- API do WhatsApp Business é complexa e tem custos
- Web Push é suficiente para validar conceito de notificações
- Se usuários pedirem ativamente, adicionar depois
- Reduz escopo técnico significativamente

---

### 4.5 Por Que Limites Tão Restritos no Free? (3 hábitos, 1 meta)
**Decisão:** Limites apertados para incentivar conversão.

**Justificativa:**
- 3 hábitos é suficiente para testar o app
- Limites claros criam urgência de upgrade
- Se limites forem muito generosos, conversão será baixa
- Pode ser ajustado depois baseado em dados

---

### 4.6 Por Que Dashboards Simples (Não Preditivos)?
**Decisão:** Dashboards básicos no MVP.

**Justificativa:**
- Dashboards preditivos requerem volume de dados (meses de uso)
- ML é complexo e caro de desenvolver/manter
- Dashboards básicos são suficientes para validar utilidade
- Previsões podem ser adicionadas depois com dados reais

---

## 5. Hipóteses a Validar com o MVP

### H1: Usuários se engajam mais com IA que tem personalidade
**Como validar:**
- Comparar taxa de interação com IA vs. apps sem IA (pesquisa com usuários)
- Medir quantas vezes por semana usuários interagem com IA
- Feedback qualitativo (entrevistas)

**Métrica de sucesso:** >70% dos usuários interagem com IA pelo menos 3x/semana

---

### H2: Decomposição automática de metas reduz fricção
**Como validar:**
- Medir % de usuários que usam a feature vs. criação manual de subtarefas
- Pesquisar satisfação com subtarefas sugeridas
- Comparar taxa de conclusão de metas (com IA vs. sem IA)

**Métrica de sucesso:** >80% dos usuários que criam metas usam decomposição automática

---

### H3: Usuários completam mais hábitos com Habit Coach AI do que com apps tradicionais
**Como validar:**
- Pesquisa pré-uso: "Qual sua taxa de conclusão em apps anteriores?"
- Comparar com taxa de conclusão no Habit Coach AI após 30 dias
- Entrevistas qualitativas

**Métrica de sucesso:** Taxa de conclusão >60% (vs. média de ~40% em apps tradicionais)

---

### H4: Usuários estão dispostos a pagar por features premium
**Como validar:**
- Taxa de conversão Free → Pro após 30 dias
- Pesquisar motivos de upgrade/não-upgrade
- Testar preços diferentes (A/B test)

**Métrica de sucesso:** >5% de conversão Free → Pro

---

### H5: Notificações aumentam conclusão de hábitos
**Como validar:**
- Comparar taxa de conclusão de usuários com notificações ON vs. OFF
- Medir quantos hábitos são completados via notificação (clique direto)

**Métrica de sucesso:** Usuários com notificações ON completam +20% mais hábitos

---

## 6. Métricas de Sucesso do MVP

### 6.1 Métricas de Produto

| Métrica | Meta MVP | Como Medir |
|---------|----------|------------|
| **Usuários Ativos (MAU)** | 100+ usuários após 30 dias | Analytics |
| **Retenção D7** | >40% | Cohort analysis |
| **Retenção D30** | >25% | Cohort analysis |
| **Taxa de Conclusão de Hábitos** | >60% | (Hábitos completados / Hábitos esperados) * 100 |
| **Engajamento com IA** | >70% interagem 3x/semana | Analytics de chat/mensagens |
| **NPS (Net Promoter Score)** | >50 | Pesquisa in-app |
| **Uso de Decomposição de Metas** | >80% das metas criadas | Analytics |
| **Tempo Médio no App** | >5 min/sessão | Analytics |

### 6.2 Métricas de Negócio

| Métrica | Meta MVP | Como Medir |
|---------|----------|------------|
| **Taxa de Conversão Free → Pro** | >5% após 30 dias | Stripe/sistema de pagamento |
| **Churn Mensal** | <10% | Cancelamentos / Total de Pro |
| **LTV/CAC** | >3:1 | (Valor de vida do cliente) / (Custo de aquisição) |
| **MRR (Monthly Recurring Revenue)** | R$ 1.500+ em 90 dias | Stripe |

### 6.3 Métricas Qualitativas

| Métrica | Meta MVP | Como Medir |
|---------|----------|------------|
| **Feedback Positivo sobre IA** | >60% de 👍 em mensagens | In-app feedback |
| **Satisfação com Subtarefas Geradas** | >80% aceitam pelo menos 50% das sugestões | Analytics |
| **Razão de Upgrade para Pro** | Identificar top 3 motivos | Pesquisa |
| **Problemas Mais Comuns** | Identificar top 5 issues | Feedback + Support tickets |

---

## 7. Cronograma de Desenvolvimento do MVP

### Semana 1-2: Setup e Fundação
- ✅ Setup Next.js 16 + TypeScript
- ✅ Setup PostgreSQL (Vercel Postgres ou Neon)
- ✅ Setup Drizzle ORM + migrations
- ✅ Setup Better Auth (email/password)
- ✅ Setup next-safe-action + Zod
- ✅ Database schema com Drizzle (todas as tabelas)
- ✅ Middleware de autenticação para Server Actions
- ✅ Design system base (shadcn/ui + Tailwind)

### Semana 3-4: Core Features - Hábitos
- ✅ CRUD de hábitos
- ✅ Sistema de conclusão
- ✅ Cálculo de streak
- ✅ Dashboard de hábitos
- ✅ Detalhes de hábito (calendário, stats)

### Semana 5-6: Core Features - Metas
- ✅ CRUD de metas
- ✅ Sistema de subtarefas
- ✅ Dashboard de metas
- ✅ Detalhes de meta
- ✅ Cálculo de progresso

### Semana 7-8: IA e Personalidades
- ✅ Integração OpenAI
- ✅ Prompts para 3 personalidades
- ✅ Mensagens motivacionais (contextuais)
- ✅ Chat livre com IA
- ✅ Análise semanal
- ✅ Decomposição de metas via MCP

### Semana 9: Dashboards e Visualização
- ✅ Dashboard principal (home)
- ✅ Gráficos e calendários
- ✅ Animações sutis
- ✅ Responsividade

### Semana 10: Notificações e Onboarding
- ✅ Web Push API
- ✅ Sistema de notificações
- ✅ Configurações de notificações
- ✅ Onboarding (4 telas)

### Semana 11: Planos e Monetização
- ✅ Sistema de planos (Free/Pro)
- ✅ Limites do Free
- ✅ Integração Stripe (ou mock)
- ✅ Upgrade flow

### Semana 12: Polimento e Testes
- ✅ Bug fixes
- ✅ Otimização de performance
- ✅ Testes com usuários beta (10-20 pessoas)
- ✅ Ajustes baseados em feedback
- ✅ Preparação para lançamento

---

## 8. Critérios de Aprovação para Lançamento

### ✅ Funcionalidades Completas
- [ ] Todas as features MUST HAVE estão implementadas
- [ ] Todas as features SHOULD HAVE estão implementadas ou conscientemente adiadas
- [ ] Planos Free e Pro funcionam corretamente
- [ ] Limites são respeitados

### ✅ Qualidade
- [ ] Sem bugs críticos (crashes, perda de dados)
- [ ] Performance atende requisitos (<2s dashboard, <1s operações)
- [ ] Funciona em Chrome, Safari, Firefox (últimas 2 versões)
- [ ] Responsivo em mobile, tablet, desktop
- [ ] Acessibilidade básica implementada

### ✅ IA
- [ ] 3 personalidades funcionam e são distintas
- [ ] Mensagens são contextuais e variadas
- [ ] Decomposição de metas gera subtarefas úteis (>80% dos casos em testes)
- [ ] Chat funciona sem erros

### ✅ Validação com Usuários
- [ ] Beta testado com 10-20 usuários
- [ ] Feedback qualitativo coletado
- [ ] Bugs críticos reportados foram corrigidos
- [ ] NPS dos beta testers >40

### ✅ Infraestrutura
- [ ] Monitoramento de erros configurado (Sentry)
- [ ] Analytics configurado (Posthog)
- [ ] Backups automáticos funcionando
- [ ] SSL/HTTPS configurado

### ✅ Legal e Compliance
- [ ] Termos de Uso escritos
- [ ] Política de Privacidade escrita (LGPD compliance)
- [ ] Exportação de dados funciona
- [ ] Deletar conta funciona (apaga todos os dados)

---

## 9. Plano de Lançamento

### Fase 1: Beta Privado (Semana 13-14)
- Convidar 50-100 usuários selecionados
- Coletar feedback intensivo
- Ajustes rápidos baseados em feedback
- Validar métricas iniciais

### Fase 2: Soft Launch (Semana 15-16)
- Lançamento público discreto (sem marketing massivo)
- Divulgação em comunidades de nicho (Reddit, Product Hunt, grupos de produtividade)
- Monitorar métricas de perto
- Iterar baseado em dados

### Fase 3: Launch Oficial (Semana 17+)
- Marketing ativo (se métricas da Fase 2 forem positivas)
- Pressione para atingir 1.000+ usuários
- Campanhas pagas (se orçamento permitir)
- Parcerias com influencers de produtividade

---

## 10. Próximos Passos Pós-MVP

Após lançamento e validação do MVP, priorizar features baseadas em:

1. **Dados de uso**: Quais features são mais usadas? Onde há fricção?
2. **Feedback de usuários**: O que eles pedem mais?
3. **Conversão**: O que aumentaria taxa Free → Pro?
4. **Retenção**: O que faria usuários ficarem mais tempo?

**Candidatos para Versão 1.5:**
- Dark mode (se muito pedido)
- Login social (se conversão for baixa)
- Templates de hábitos/metas (se criação for complexa)
- Mais personalidades de IA (se usuários amarem as atuais)
- Gamificação básica (se engajamento cair)

---

**Versão**: 1.0  
**Data**: Janeiro 2026  
**Status**: Aprovado para Desenvolvimento
