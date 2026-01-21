# BRIEF - Habit Coach AI

## Problema

Milhões de pessoas lutam para manter hábitos saudáveis e alcançar metas por falta de motivação, acompanhamento personalizado e feedback construtivo. Apps tradicionais de rastreamento de hábitos são ferramentas passivas que apenas registram dados, sem oferecer suporte emocional ou orientação estratégica adaptada ao perfil do usuário.

## Solução Proposta

Habit Coach AI é uma plataforma de coaching de hábitos e metas com IA integrada que oferece acompanhamento personalizado através de personalidades famosas icônicas (Mestre Yoda, General Motivador, etc.). A IA não apenas analisa o progresso do usuário, mas interage de forma motivadora usando trejeitos característicos de cada personagem, além de oferecer sugestões inteligentes como quebrar metas complexas em subtarefas automaticamente via MCP (Model Context Protocol).

### Principais Funcionalidades:
- **Sistema de Hábitos**: Rastreamento de ações recorrentes com análise de padrões
- **Sistema de Metas**: Objetivos com prazo e decomposição automática em subtarefas
- **IA Personalizada**: Coaching através de personalidades famosas com frases e trejeitos característicos
- **Análise Inteligente**: IA sugere subtarefas, identifica padrões de falha e oferece insights
- **Dashboards Visuais**: Visualização clara do progresso com gráficos e métricas
- **Notificações Contextuais**: Lembretes personalizados baseados no comportamento do usuário

## Público-Alvo

### Primário:
- **Profissionais ambiciosos** (25-40 anos) que buscam construir hábitos produtivos e alcançar metas de carreira
- **Estudantes e autodidatas** que precisam de disciplina para estudos e desenvolvimento pessoal
- **Pessoas em transformação pessoal** buscando criar novos hábitos (fitness, meditação, leitura)

### Secundário:
- **Entusiastas de produtividade** que já usam outros apps mas sentem falta de motivação personalizada
- **Fãs de gamificação e cultura pop** que se engajam com personalidades famosas

## Diferencial Competitivo

### vs. Apps Tradicionais de Hábitos (Habitica, Streaks, Loop):
✅ **IA com personalidades**: Coaching motivacional através de personagens icônicos com trejeitos característicos
✅ **Análise preditiva**: Não apenas registra, mas prevê falhas e sugere ajustes
✅ **Decomposição automática**: IA quebra metas complexas em subtarefas viáveis via MCP

### vs. Apps com IA Genérica:
✅ **Personalidades únicas**: Não é apenas um chatbot, cada coach tem estilo próprio (Yoda fala invertendo frases, General é direto e motivador)
✅ **Contexto profundo**: IA analisa histórico completo para oferecer insights personalizados

### vs. Coaching Humano:
✅ **Disponibilidade 24/7**: Sempre presente para motivar e orientar
✅ **Custo acessível**: Modelo de assinatura vs. sessões caras de coaching
✅ **Escalabilidade**: Atende infinitos usuários simultaneamente

## Modelo de Negócio

### Freemium com Assinatura:
- **Plano Free**: 
  - Até 3 hábitos ativos
  - 1 meta ativa
  - 1 personalidade de IA
  - Dashboards básicos
  
- **Plano Pro** (R$ 29,90/mês):
  - Hábitos e metas ilimitados
  - Todas as personalidades de IA
  - Análise preditiva avançada
  - Dashboards completos com previsões
  - Decomposição automática de metas via MCP
  - Notificações personalizadas ilimitadas

### Receita Projetada (Ano 1):
- **Mês 1-3**: Validação com early adopters (100-500 usuários)
- **Mês 4-6**: Crescimento inicial (1.000-5.000 usuários)
- **Mês 7-12**: Expansão (10.000+ usuários, taxa de conversão 5-10%)

## Métricas de Sucesso

### Métricas de Produto (MVP):
- **Taxa de conclusão de hábitos**: >60% dos hábitos marcados como completos semanalmente
- **Engajamento com IA**: >70% dos usuários interagem com a IA pelo menos 3x/semana
- **Retenção D7**: >40% dos usuários retornam após 7 dias
- **Retenção D30**: >25% dos usuários ativos após 30 dias
- **NPS (Net Promoter Score)**: >50

### Métricas de Negócio:
- **Taxa de conversão Free → Pro**: >5% após 30 dias de uso
- **Churn mensal**: <10%
- **LTV/CAC**: >3:1

### Indicadores de Validação:
- ✅ Usuários elogiam as personalidades da IA (feedback qualitativo)
- ✅ Decomposição automática de metas é utilizada em >50% das metas criadas
- ✅ Usuários completam mais hábitos comparado a apps anteriores (pesquisa)

## Tecnologia

### Stack Técnico:
- **Framework**: Next.js 16 (App Router) - versão mais recente
- **Backend**: Server Actions + next-safe-action para type-safe mutations
- **Database**: PostgreSQL + Drizzle ORM (type-safe, migrations versionadas)
- **Auth**: Better Auth (sessões, OAuth, 2FA)
- **Validação**: Zod (schema validation end-to-end)
- **IA**: OpenAI GPT-4 com fine-tuning para personalidades + MCP para decomposição de metas
- **UI/UX**: shadcn/ui + Tailwind CSS como design system base
- **Hosting DB**: Vercel Postgres ou Neon (PostgreSQL serverless)
- **Notificações**: Web Push API (MVP) → WhatsApp/SMS (futuro)

### Arquitetura:
- Server Actions para todas as operações de backend (type-safe, sem API routes)
- Drizzle ORM para queries type-safe ao PostgreSQL
- Better Auth para autenticação e sessões
- Edge Functions (Vercel) para operações críticas de IA
- Polling ou WebSockets para updates em tempo real (não-crítico para MVP)

## Roadmap (6 meses)

### Mês 1-2: MVP
- ✅ Sistema de hábitos e metas
- ✅ IA com 2-3 personalidades iniciais
- ✅ Dashboards básicos
- ✅ Notificações no app

### Mês 3-4: Validação e Iteração
- 🔄 Testes com early adopters
- 🔄 Ajustes baseados em feedback
- 🔄 Melhoria da IA e personalidades
- 🔄 Onboarding otimizado

### Mês 5-6: Growth Features
- 🚀 Gamificação (pontos, badges, níveis)
- 🚀 Dashboards preditivos
- 🚀 Integração com WhatsApp
- 🚀 Mais personalidades de IA
- 🚀 Compartilhamento social de conquistas

## Riscos e Mitigações

### Risco 1: IA não é suficientemente "humana"
**Mitigação**: Investir em fine-tuning de cada personalidade com exemplos extensos, testes A/B de respostas

### Risco 2: Usuários não convertem para Pro
**Mitigação**: Limites generosos no Free, mas valor claro no Pro (personalidades exclusivas, análises avançadas)

### Risco 3: Competição com apps estabelecidos
**Mitigação**: Foco no diferencial (IA com personalidades), marketing de nicho, comunidade engajada

### Risco 4: Custo de IA elevado
**Mitigação**: Otimizar prompts, cachear respostas comuns, limitar interações no plano Free

## Timeline de Lançamento

- **Semana 1-4**: Desenvolvimento do MVP
- **Semana 5-6**: Testes internos e ajustes
- **Semana 7-8**: Beta privado com 50-100 usuários selecionados
- **Semana 9-10**: Iteração baseada em feedback
- **Semana 11-12**: Lançamento público soft launch

---

**Versão**: 1.0  
**Data**: Janeiro 2026  
**Status**: Em Desenvolvimento
