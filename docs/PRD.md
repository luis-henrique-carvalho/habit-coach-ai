# PRD - Habit Coach AI

## 1. Visão Geral do Produto

### 1.1 Contexto
Habit Coach AI é uma plataforma de coaching personalizado para construção de hábitos e alcance de metas, diferenciada pela integração de uma IA que assume personalidades de personagens famosos icônicos. O produto combina rastreamento tradicional de hábitos com análise inteligente, feedback motivacional personalizado e decomposição automática de metas complexas.

### 1.2 Objetivos do Produto
- Aumentar a taxa de conclusão de hábitos dos usuários em comparação com apps tradicionais
- Oferecer motivação personalizada através de IA com personalidades únicas
- Simplificar o planejamento de metas através de decomposição automática via MCP
- Criar uma experiência envolvente que mantenha usuários engajados a longo prazo
- Validar modelo de negócio freemium com conversão para assinatura Pro

### 1.3 Escopo
Este PRD cobre o MVP (Minimum Viable Product) focado em:
- Sistema de registro e rastreamento de hábitos
- Sistema de criação e gerenciamento de metas com subtarefas
- IA conversacional com personalidades famosas
- Análise automática de metas com sugestão de subtarefas via MCP
- Dashboards de visualização de progresso
- Sistema de notificações no app

### 1.4 Stack Técnico
- **Framework**: Next.js 16 (App Router, React Server Components)
- **Backend**: Server Actions + next-safe-action (type-safe mutations)
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: Better Auth (sessões, OAuth, magic links)
- **Validação**: Zod (end-to-end schema validation)
- **IA**: OpenAI GPT-4 (via Server Actions)
- **UI**: shadcn/ui + Tailwind CSS
- **Hosting**: Vercel (app) + Vercel Postgres ou Neon (database)

Fora do escopo do MVP:
- Gamificação avançada (pontos, badges, rankings)
- Integração com WhatsApp/SMS
- Dashboards preditivos com ML
- Compartilhamento social
- Integração com wearables

---

## 2. Personas

### Persona 1: Ana - A Profissional Ambiciosa
**Dados Demográficos:**
- 28 anos, Desenvolvedora de Software
- Mora em São Paulo, trabalha remotamente
- Renda: R$ 8.000-12.000/mês

**Contexto:**
Ana quer construir hábitos de estudos (aprender inglês, fazer cursos) e exercícios, mas frequentemente desiste por falta de motivação e acompanhamento. Já usou apps como Habitica e Streaks, mas achou "frios" e sem personalização.

**Objetivos:**
- Estudar inglês 30min/dia
- Ir à academia 4x/semana
- Ler 1 livro técnico por mês
- Meditar 10min/dia

**Frustrações:**
- Apps tradicionais apenas registram dados, não motivam
- Falta de feedback quando falha em hábitos
- Dificuldade em transformar metas grandes (ex: "Aprender React Native") em passos concretos

**Como Habit Coach AI ajuda:**
- IA com personalidade de Mestre Yoda oferece frases motivacionais quando Ana registra hábitos
- Quando Ana define meta "Aprender React Native", a IA sugere subtarefas: "Configurar ambiente", "Tutorial oficial", "Projeto prático"
- Dashboards mostram padrões (ex: "Você medita mais em dias que vai à academia")

### Persona 2: Carlos - O Estudante Disciplinado
**Dados Demográficos:**
- 22 anos, Estudante de Engenharia (último ano)
- Mora com pais, estuda para concursos
- Sem renda fixa (mesada + freelas)

**Contexto:**
Carlos precisa manter disciplina extrema para estudar para concursos enquanto termina faculdade. Usa Notion e planilhas, mas quer algo mais visual e motivador.

**Objetivos:**
- Estudar 6h/dia (dividido em blocos)
- Resolver 50 questões de concurso/dia
- Revisar conteúdo semanalmente
- Manter sono regular (dormir 23h, acordar 6h)

**Frustrações:**
- Planilhas exigem atualização manual constante
- Sem feedback quando está indo bem ou mal
- Difícil visualizar progresso de forma motivadora

**Como Habit Coach AI ajuda:**
- IA como General Motivador dá feedback direto: "Soldado, 3 dias seguidos de 6h. Você está pronto para a batalha!"
- Meta "Passar em concurso X" é decomposta em subtarefas (edital, cronograma por matéria, simulados)
- Dashboard mostra heatmap de horas estudadas, taxa de acerto em questões

### Persona 3: Mariana - A Em Transformação
**Dados Demográficos:**
- 35 anos, Gerente de Marketing
- Casada, 1 filho pequeno
- Renda: R$ 10.000-15.000/mês

**Contexto:**
Mariana quer reconstruir sua vida após período de burnout. Quer criar hábitos saudáveis mas tem pouco tempo livre e energia mental limitada.

**Objetivos:**
- Caminhar 20min/dia
- Journaling 5min antes de dormir
- Não usar celular 1h antes de dormir
- Tomar 2L de água/dia

**Frustrações:**
- Apps complexos demandam muito setup
- Culpa quando não consegue manter hábitos
- Precisa de motivação gentil, não agressiva

**Como Habit Coach AI ajuda:**
- IA com personalidade empática (ex: Mr. Rogers) oferece suporte sem julgamento
- Dashboards simples focam em progresso, não em falhas
- Notificações suaves: "Que tal uma caminhada? Não há pressa, apenas movimento."

---

## 3. User Stories

### 3.1 Sistema de Hábitos

**US01: Criar Hábito**
> Como Ana, quero criar um novo hábito especificando nome, frequência e horário preferencial, para que eu possa rastreá-lo diariamente.

**Critérios de Aceitação:**
- Usuário pode definir nome do hábito (ex: "Meditar")
- Usuário pode escolher frequência: Diária, Dias específicos da semana, X vezes por semana
- Usuário pode definir horário sugerido (opcional)
- Usuário pode adicionar descrição/notas (opcional)
- Hábito é salvo e aparece no dashboard principal
- Sistema cria notificação automática se horário foi definido

**US02: Registrar Conclusão de Hábito**
> Como Carlos, quero marcar um hábito como completo hoje, para que eu possa rastrear meu progresso.

**Critérios de Aceitação:**
- Usuário vê lista de hábitos do dia no dashboard
- Usuário pode marcar/desmarcar hábito com um clique
- Ao marcar, IA envia mensagem motivacional personalizada (ex: Yoda: "Forte você está hoje!")
- Status é salvo em tempo real
- Streak (sequência de dias) é atualizado automaticamente

**US03: Visualizar Histórico de Hábito**
> Como Mariana, quero ver o histórico de um hábito específico, para entender meus padrões de comportamento.

**Critérios de Aceitação:**
- Usuário pode abrir detalhes de um hábito
- Visualiza calendário (heatmap) dos últimos 90 dias
- Vê estatísticas: Streak atual, Streak recorde, Taxa de conclusão
- Vê gráfico de tendência (melhorando/estável/piorando)
- IA oferece insights (ex: "Você completa mais esse hábito nos finais de semana")

**US04: Editar ou Arquivar Hábito**
> Como Ana, quero editar ou arquivar um hábito que não é mais relevante, para manter meu dashboard organizado.

**Critérios de Aceitação:**
- Usuário pode editar nome, frequência, horário de hábito existente
- Usuário pode arquivar hábito (remove do dashboard ativo mas mantém histórico)
- Usuário pode reativar hábito arquivado
- Histórico não é perdido ao arquivar

### 3.2 Sistema de Metas

**US05: Criar Meta**
> Como Carlos, quero criar uma meta com título, descrição, data limite e categoria, para organizar meus objetivos.

**Critérios de Aceitação:**
- Usuário pode definir título da meta (ex: "Passar no concurso X")
- Usuário pode adicionar descrição detalhada
- Usuário DEVE definir data limite
- Usuário pode categorizar meta (Carreira, Saúde, Estudos, Pessoal, Outro)
- Meta é salva e aparece na lista de metas ativas

**US06: IA Sugere Subtarefas para Meta**
> Como Ana, quero que a IA analise minha meta e sugira subtarefas, para que eu não precise planejar tudo manualmente.

**Critérios de Aceitação:**
- Após criar meta, usuário vê opção "Gerar subtarefas com IA"
- IA (via MCP) analisa título + descrição da meta
- IA sugere 3-8 subtarefas específicas e acionáveis
- Usuário pode aceitar todas, aceitar individualmente, ou editar sugestões
- Subtarefas aceitas são adicionadas à meta automaticamente
- Cada subtarefa pode ter data limite sugerida baseada na data da meta

**Exemplo:**
Meta: "Aprender React Native em 3 meses"
Subtarefas sugeridas:
1. Configurar ambiente (React Native CLI + Android Studio) - Semana 1
2. Completar tutorial oficial do React Native - Semana 2-3
3. Construir app de lista de tarefas - Semana 4-5
4. Integrar com API real (backend) - Semana 6-7
5. Publicar app de teste na Play Store - Semana 8-10
6. Construir projeto próprio mais complexo - Semana 11-12

**US07: Gerenciar Subtarefas**
> Como Carlos, quero adicionar, editar e completar subtarefas de uma meta, para acompanhar progresso granular.

**Critérios de Aceitação:**
- Usuário pode adicionar subtarefas manualmente
- Usuário pode marcar subtarefa como completa
- Usuário pode editar/deletar subtarefas
- Progresso da meta é calculado automaticamente (% de subtarefas completas)
- IA celebra quando subtarefa importante é concluída

**US08: Visualizar Progresso de Meta**
> Como Mariana, quero ver visualmente o progresso de minhas metas, para me manter motivada.

**Critérios de Aceitação:**
- Dashboard mostra todas as metas ativas
- Cada meta exibe barra de progresso (% completo)
- Metas próximas do prazo são destacadas visualmente
- Usuário pode filtrar: Todas, Em andamento, Atrasadas, Completas
- Usuário pode ver dias restantes até deadline

**US09: Completar Meta**
> Como Ana, quero marcar uma meta como concluída, para celebrar minha conquista.

**Critérios de Aceitação:**
- Usuário pode marcar meta como completa manualmente
- Meta é marcada automaticamente como completa quando 100% das subtarefas são concluídas
- IA oferece mensagem celebratória personalizada (ex: Yoda: "Orgulhoso de você, eu estou!")
- Meta move para seção "Concluídas"
- Usuário pode arquivar metas concluídas

### 3.3 IA e Coaching

**US10: Escolher Personalidade da IA**
> Como Ana, quero escolher qual personalidade de coach me acompanhará, para ter uma experiência personalizada.

**Critérios de Aceitação:**
- No onboarding ou configurações, usuário vê galeria de personalidades
- Cada personalidade tem: Nome, Descrição, Exemplo de frase, Preview de avatar
- Personalidades MVP: Mestre Yoda, General Motivador, Mentor Empático
- Usuário pode trocar personalidade a qualquer momento
- Mudança reflete em todas as interações futuras

**US11: Receber Feedback Motivacional da IA**
> Como Carlos, quero receber mensagens motivacionais da IA quando completo hábitos ou subtarefas, para me sentir apoiado.

**Critérios de Aceitação:**
- Ao completar hábito, IA envia mensagem curta (1-2 frases) com trejeitos da personalidade escolhida
- Mensagens são contextuais: consideram streak, hora do dia, dificuldade do hábito
- Mensagens variam (não repetem)
- Usuário pode dar feedback (👍/👎) sobre mensagens

**Exemplos de Mensagens:**

**Mestre Yoda (Meditar - 7 dias de streak):**
> "Sete dias de meditação. Forte na Força você está ficando. Continuar você deve."

**General Motivador (Estudar 6h no dia):**
> "Soldado! 6 horas de estudo. Isso é dedicação de elite. Mantenha o ritmo!"

**Mentor Empático (Falhou em hábito pela primeira vez em 10 dias):**
> "Dez dias de consistência mostraram sua capacidade. Um dia de pausa não apaga seu progresso. Amanhã é um novo começo."

**US12: Conversar com IA sobre Progresso**
> Como Mariana, quero fazer perguntas à IA sobre meu progresso, para obter insights personalizados.

**Critérios de Aceitação:**
- Usuário pode abrir chat com IA a qualquer momento
- Usuário pode fazer perguntas como: "Por que estou falhando no hábito X?", "Quais meus melhores dias da semana?", "Como posso melhorar?"
- IA analisa dados do usuário (hábitos, metas, histórico) para responder
- Respostas mantêm personalidade escolhida
- Conversas são salvas e podem ser revisitadas

**US13: Receber Análise Semanal da IA**
> Como Ana, quero receber um resumo semanal da IA sobre meu desempenho, para refletir sobre minha semana.

**Critérios de Aceitação:**
- Todo domingo ou dia escolhido pelo usuário, IA gera resumo
- Resumo inclui: Taxa de conclusão de hábitos, Metas com maior progresso, Padrões identificados, Sugestão de foco para próxima semana
- Resumo é enviado via notificação e fica salvo no app
- Usuário pode pedir análise sob demanda

### 3.4 Dashboards e Visualização

**US14: Dashboard Principal (Overview)**
> Como Carlos, quero ver um dashboard que resume tudo que é relevante hoje, para não perder foco.

**Critérios de Aceitação:**
- Dashboard mostra: Hábitos de hoje (pendentes/completos), Metas ativas (top 3 prioritárias), Mensagem motivacional da IA, Streak mais longo atual
- Design clean e escanável
- Carrega em menos de 2 segundos

**US15: Dashboard de Hábitos**
> Como Ana, quero visualizar todos meus hábitos em um lugar, com estatísticas claras.

**Critérios de Aceitação:**
- Lista todos os hábitos ativos
- Cada hábito mostra: Nome, Streak atual, Taxa de conclusão (últimos 30 dias), Última vez completado
- Usuário pode ordenar por: Nome, Streak, Taxa de conclusão
- Hábitos com baixa taxa de conclusão são destacados

**US16: Dashboard de Metas**
> Como Mariana, quero visualizar todas minhas metas e progresso, para priorizar melhor.

**Critérios de Aceitação:**
- Lista todas as metas ativas
- Cada meta mostra: Título, Progresso (%), Dias restantes, Categoria
- Usuário pode filtrar por categoria
- Usuário pode ordenar por: Prazo, Progresso, Data de criação

**US17: Calendário de Atividades**
> Como Carlos, quero ver um calendário visual de todos meus hábitos, para identificar padrões.

**Critérios de Aceitação:**
- Visualização de calendário mensal
- Cada dia mostra: Quantos hábitos foram completados, Cor/intensidade baseada em performance
- Usuário pode clicar em um dia para ver detalhes
- Usuário pode navegar entre meses

### 3.5 Notificações

**US18: Configurar Notificações**
> Como Ana, quero escolher quando e como receber notificações, para não ser sobrecarregada.

**Critérios de Aceitação:**
- Usuário pode ativar/desativar notificações globalmente
- Usuário pode configurar horários específicos para lembretes de hábitos
- Usuário pode escolher receber: Lembretes de hábitos, Celebrações da IA, Resumo semanal, Metas próximas do prazo
- Configurações são salvas e respeitadas

**US19: Receber Lembrete de Hábito**
> Como Mariana, quero receber lembrete para fazer um hábito no horário que configurei.

**Critérios de Aceitação:**
- Notificação é enviada no horário definido para o hábito
- Mensagem inclui nome do hábito e frase motivacional da IA
- Usuário pode marcar hábito como completo diretamente da notificação
- Se hábito já foi completo, notificação não é enviada

**US20: Receber Alerta de Meta Próxima do Prazo**
> Como Carlos, quero ser alertado quando uma meta está próxima do prazo, para não perder o deadline.

**Critérios de Aceitação:**
- Notificação é enviada 7 dias, 3 dias e 1 dia antes do prazo
- Mensagem inclui título da meta e progresso atual
- Usuário pode abrir meta diretamente da notificação

### 3.6 Onboarding e Configuração

**US21: Onboarding Inicial**
> Como novo usuário, quero ser guiado no primeiro uso, para entender rapidamente como usar o app.

**Critérios de Aceitação:**
- Onboarding em 3-4 telas: Boas-vindas, Escolher personalidade de IA, Criar primeiro hábito, Criar primeira meta (opcional)
- Usuário pode pular onboarding
- Após onboarding, usuário vai direto ao dashboard

**US22: Gerenciar Conta**
> Como Ana, quero gerenciar minha conta, incluindo email, senha e plano de assinatura.

**Critérios de Aceitação:**
- Usuário pode atualizar email e senha
- Usuário pode ver plano atual (Free/Pro)
- Usuário pode fazer upgrade para Pro (integração com sistema de pagamento)
- Usuário pode deletar conta (com confirmação e aviso de perda de dados)

---

## 4. Requisitos Funcionais Detalhados

### 4.1 Sistema de Autenticação

**RF01: Registro de Usuário**
- Usuário pode criar conta via email + senha
- Email deve ser validado (envio de link de confirmação)
- Senha deve ter mínimo 8 caracteres, validada com Zod
- Sistema valida se email já está em uso
- Após registro, usuário é direcionado ao onboarding
- Implementado via Better Auth + Server Actions

**RF02: Login**
- Usuário pode fazer login com email + senha
- Sistema exibe erro claro se credenciais estão incorretas
- Sistema oferece opção "Esqueci minha senha"
- Sessões seguras com cookies httpOnly
- Login implementado via Better Auth

**RF03: Login Social (Futuro)**
- Google OAuth (Better Auth suporta nativamente)
- GitHub OAuth (opcional)
- Magic links (passwordless via email)

**RF04: Recuperação de Senha**
- Usuário insere email
- Sistema envia link de recuperação via Better Auth
- Usuário pode redefinir senha via link seguro
- Token de recuperação expira em 24h

**Exemplo de Implementação:**
```typescript
// app/actions/auth.ts
"use server";
import { z } from "zod";
import { action } from "@/lib/safe-action";
import { auth } from "@/lib/auth";

export const signUp = action
  .schema(z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1),
  }))
  .action(async ({ parsedInput }) => {
    const result = await auth.api.signUpEmail({
      email: parsedInput.email,
      password: parsedInput.password,
      name: parsedInput.name,
    });
    
    if (!result.user) throw new Error("Falha ao criar usuário");
    return { success: true };
  });
```

### 4.2 Sistema de Hábitos

**RF05: CRUD de Hábitos**
- Create: Nome (required), Frequência (required), Horário (optional), Descrição (optional)
- Read: Listar hábitos ativos, arquivados, detalhes de hábito específico
- Update: Editar qualquer campo de hábito existente
- Delete: Arquivar hábito (soft delete - mantém histórico)

**RF06: Tipos de Frequência**
- Diária (todos os dias)
- Dias específicos (ex: Seg, Qua, Sex)
- X vezes por semana (ex: 3x/semana)

**RF07: Registro de Conclusão**
- Usuário marca hábito como completo para dia atual
- Sistema registra timestamp
- Sistema atualiza streak (sequência de dias)
- Não pode marcar dias futuros
- Pode marcar dias passados (últimos 7 dias apenas)

**RF08: Cálculo de Streak**
- Streak = dias consecutivos completando hábito
- Se hábito é "3x/semana", streak considera semana completa (não dias)
- Streak quebra se dia esperado não for completado
- Sistema salva "streak recorde" (maior streak alcançado)

**RF09: Estatísticas de Hábito**
- Taxa de conclusão: (dias completados / dias esperados) * 100
- Período padrão: últimos 30 dias
- Melhor dia da semana (dia com maior taxa de conclusão)
- Média de horas do dia que completa hábito

### 4.3 Sistema de Metas

**RF10: CRUD de Metas**
- Create: Título (required), Descrição (optional), Data limite (required), Categoria (required)
- Read: Listar metas ativas, concluídas, arquivadas, detalhes de meta específica
- Update: Editar qualquer campo de meta existente
- Delete: Arquivar meta (soft delete)

**RF11: Categorias de Metas**
- Predefinidas: Carreira, Saúde, Estudos, Pessoal, Finanças, Outro
- Cada categoria tem cor associada para visualização

**RF12: Sistema de Subtarefas**
- Subtarefa tem: Título (required), Descrição (optional), Data limite (optional), Status (pendente/completa)
- Subtarefas são ordenadas (usuário pode reordenar)
- Completar subtarefa atualiza % de progresso da meta
- Deletar subtarefa recalcula progresso

**RF13: Decomposição Automática via MCP**
- Quando usuário cria meta, pode solicitar sugestões de subtarefas
- Sistema envia título + descrição da meta para IA via MCP
- IA retorna array de subtarefas sugeridas com títulos e estimativa de tempo/prazo
- Usuário pode aceitar/rejeitar/editar cada sugestão
- Subtarefas aceitas são criadas automaticamente

**Prompt Base para MCP:**
```
Analise a seguinte meta e sugira 4-8 subtarefas específicas e acionáveis para alcançá-la.

Meta: {titulo}
Descrição: {descricao}
Prazo: {data_limite}

Para cada subtarefa, forneça:
1. Título claro e acionável
2. Descrição breve (opcional)
3. Estimativa de quando deve ser concluída (relativo ao prazo da meta)

Subtarefas devem ser:
- Específicas e mensuráveis
- Sequenciais quando aplicável
- Realistas dentro do prazo
```

**RF14: Cálculo de Progresso**
- Progresso = (subtarefas completas / total subtarefas) * 100
- Se meta não tem subtarefas, progresso é manual (0% ou 100%)
- Meta é automaticamente marcada como completa quando progresso = 100%

**RF15: Alertas de Prazo**
- Sistema verifica diariamente metas com prazo próximo
- Envia notificação em: 7 dias antes, 3 dias antes, 1 dia antes, dia do prazo
- Mensagem inclui progresso atual e sugestão da IA

### 4.4 Sistema de IA e Coaching

**RF16: Personalidades Disponíveis (MVP)**
1. **Mestre Yoda** (Sábio e Encorajador)
   - Tom: Sábio, calmo, encorajador
   - Trejeitos: Inverte ordem de palavras ("Forte você está"), usa metáforas da Força
   - Exemplos: "Faça ou não faça. Tentativa não há.", "Muito a aprender você ainda tem."

2. **General Motivador** (Direto e Intenso)
   - Tom: Direto, intenso, militar
   - Trejeitos: Chama usuário de "Soldado", usa linguagem de batalha/missão
   - Exemplos: "Soldado, missão cumprida! Próximo objetivo!", "Sem desculpas. Avante!"

3. **Mentor Empático** (Gentil e Compreensivo)
   - Tom: Gentil, compreensivo, paciente
   - Trejeitos: Valida sentimentos, oferece perspectiva positiva
   - Exemplos: "É normal ter dias difíceis. O importante é continuar tentando.", "Você está fazendo progresso, mesmo que não pareça."

**RF17: Contextos de Interação da IA**
1. **Ao completar hábito**: Mensagem motivacional curta
2. **Ao completar subtarefa**: Celebração + progresso da meta
3. **Ao alcançar streak milestone**: Celebração especial (7, 14, 30, 60, 90 dias)
4. **Ao completar meta**: Celebração grande + reflexão
5. **Ao falhar em hábito**: Mensagem encorajadora (não punitiva)
6. **Chat livre**: Responde perguntas sobre progresso, dá dicas

**RF18: Geração de Mensagens**
- Todas as mensagens são geradas via OpenAI GPT-4
- Sistema usa prompts específicos para cada personalidade
- Mensagens consideram contexto: nome do usuário, nome do hábito/meta, streak, hora do dia, histórico recente
- Cache de mensagens comuns para reduzir custo de API

**Exemplo de Prompt:**
```
Você é {personalidade_nome}. {personalidade_descricao}

Contexto:
- Usuário: {nome_usuario}
- Ação: {completou_habito_X}
- Streak atual: {streak}
- Hora do dia: {hora}

Gere uma mensagem motivacional curta (1-2 frases) para celebrar esta conquista.
Use os trejeitos característicos de {personalidade_nome}.
```

**RF19: Análise Semanal**
- Toda semana (domingo ou dia configurado), sistema gera resumo
- IA analisa: Taxa de conclusão de hábitos, Metas com maior/menor progresso, Padrões (dias bons/ruins, horários), Tendências (melhorando/piorando)
- Resumo é formatado em seções: Destaques da Semana, Áreas de Atenção, Foco para Próxima Semana
- Resumo é salvo e pode ser acessado no histórico

**RF20: Chat com IA**
- Usuário pode iniciar conversa livre com IA
- IA tem acesso a: Todos os hábitos do usuário, Todas as metas do usuário, Histórico de conclusões, Estatísticas
- Perguntas típicas: "Por que falho mais em X?", "Qual meu melhor horário para Y?", "Como posso melhorar Z?"
- Histórico de conversas é salvo

### 4.5 Dashboards e Visualização

**RF21: Dashboard Principal (Home)**
Componentes:
- Header: Saudação personalizada ("Bom dia, Ana!") + data
- Hábitos de Hoje: Lista checklist de hábitos esperados hoje
- Metas em Destaque: Top 3 metas (ordenadas por prazo ou usuário define)
- Mensagem da IA: Frase motivacional do dia ou insight
- Quick Stats: Streak mais longo, Taxa de conclusão da semana

**RF22: Dashboard de Hábitos**
- Lista de hábitos ativos (cards ou tabela)
- Cada hábito exibe: Nome, Ícone (opcional), Streak, Taxa de conclusão 30 dias
- Filtros: Todos, Ativos, Arquivados
- Ordenação: Alfabética, Streak, Taxa de conclusão
- Busca por nome

**RF23: Dashboard de Metas**
- Lista de metas ativas (cards ou tabela)
- Cada meta exibe: Título, Categoria (cor), Progresso (%), Dias restantes
- Filtros: Categoria, Status (Ativas, Atrasadas, Concluídas)
- Ordenação: Prazo, Progresso, Alfabética

**RF24: Detalhes de Hábito**
- Informações gerais (nome, frequência, horário)
- Calendário/Heatmap: Últimos 90 dias (verde = completo, cinza = pendente)
- Gráfico de tendência: Taxa de conclusão por semana
- Estatísticas: Streak atual, Recorde, Taxa 30/60/90 dias, Melhor dia da semana
- Insights da IA (se disponíveis)
- Histórico de conclusões (lista com timestamps)

**RF25: Detalhes de Meta**
- Informações gerais (título, descrição, categoria, prazo)
- Barra de progresso visual
- Lista de subtarefas (ordenadas, com checkboxes)
- Botão "Gerar mais subtarefas com IA"
- Linha do tempo: Data criação → Hoje → Prazo
- Comentários/Notas (futuro)

**RF26: Calendário Geral**
- Visualização de calendário mensal
- Cada dia mostra indicador de performance (ex: 3/5 hábitos completados)
- Cores baseadas em taxa de conclusão do dia
- Clicar no dia abre detalhes: Hábitos completos/pendentes, Subtarefas concluídas

### 4.6 Notificações

**RF27: Tipos de Notificação**
1. Lembrete de Hábito (no horário configurado)
2. Celebração de Streak (milestone alcançado)
3. Alerta de Meta (prazo próximo)
4. Resumo Semanal (disponível)
5. Mensagem da IA (contextuais)

**RF28: Configurações de Notificação**
- Toggle global: Ativar/Desativar todas
- Toggles individuais para cada tipo
- Horário de "Modo Silencioso" (não enviar notificações)
- Para lembretes de hábitos: Configurado por hábito

**RF29: Delivery de Notificações**
- MVP: Web Push API (notificações no navegador/PWA)
- Sistema deve pedir permissão ao usuário
- Notificações funcionam mesmo com app fechado (se PWA instalado)

**RF30: Conteúdo de Notificação**
- Título claro e curto
- Mensagem com personalidade da IA quando aplicável
- Ação primária (ex: "Marcar como completo", "Ver meta")
- Usuário pode interagir diretamente da notificação (quando possível)

### 4.7 Onboarding

**RF31: Fluxo de Onboarding**
1. **Tela 1**: Boas-vindas + Breve explicação do app
2. **Tela 2**: Escolher personalidade de IA (com previews)
3. **Tela 3**: Criar primeiro hábito (guided form)
4. **Tela 4**: (Opcional) Criar primeira meta
5. Redirecionar para Dashboard

**RF32: Onboarding Adaptativo**
- Onboarding é mostrado apenas na primeira vez
- Usuário pode pular qualquer etapa
- Se pular, valores padrão são aplicados (ex: personalidade padrão = Mentor Empático)

### 4.8 Configurações e Conta

**RF33: Perfil do Usuário**
- Nome de exibição
- Email (editável, requer confirmação)
- Avatar (upload de imagem ou gravatar)
- Timezone (para cálculos de "hoje", "ontem")

**RF34: Configurações de IA**
- Escolher personalidade ativa
- Toggle "Mensagens automáticas da IA" (ativar/desativar)
- Frequência de análises semanais (1x/semana, 2x/semana, nunca)

**RF35: Configurações de App**
- Tema (Light/Dark) - MVP apenas Light
- Idioma (MVP apenas PT-BR)
- Primeiro dia da semana (Domingo/Segunda)

**RF36: Planos e Assinatura**
- Visualizar plano atual (Free/Pro)
- Comparação de planos
- Botão "Upgrade para Pro" (integra com sistema de pagamento)
- Se Pro: Opção de cancelar assinatura

**RF37: Limites do Plano Free**
- Máximo 3 hábitos ativos
- Máximo 1 meta ativa
- Apenas 1 personalidade de IA
- Análise semanal apenas
- Dashboards básicos

**RF38: Benefícios do Plano Pro**
- Hábitos ilimitados
- Metas ilimitadas
- Todas as personalidades de IA
- Decomposição automática de metas via MCP
- Análises sob demanda
- Dashboards avançados (futuro)
- Suporte prioritário

---

## 5. Requisitos Não-Funcionais

### 5.1 Performance

**RNF01: Tempo de Carregamento**
- Dashboard principal deve carregar em < 2 segundos em conexão 4G
- Navegação entre telas deve ser instantânea (< 300ms)
- Operações de criar/editar hábitos/metas devem salvar em < 1 segundo

**RNF02: Otimização de Dados**
- Usar paginação para listas longas (>50 itens)
- Lazy loading de componentes pesados (gráficos, calendário)
- Cache de dados estáticos (personalidades, categorias)

**RNF03: Responsividade da IA**
- Mensagens motivacionais curtas devem gerar em < 2 segundos
- Decomposição de metas via MCP pode levar até 10 segundos (com loading state)
- Chat com IA deve responder em < 5 segundos

### 5.2 Segurança

**RNF04: Autenticação**
- Senhas hash com bcrypt (Better Auth gerencia automaticamente)
- Sessões server-side com cookies httpOnly (proteção contra XSS)
- Sessões expiram após 7 dias de inatividade
- CSRF protection automático (Next.js + Server Actions)
- Suporte a autenticação de 2 fatores (Better Auth - futuro)

**RNF05: Proteção de Dados**
- Todas as requisições via HTTPS
- Dados sensíveis nunca logados
- Server Actions validadas com middleware de autenticação
- Isolamento de dados por usuário (userId em todas as queries)
- Usuário pode exportar todos seus dados (LGPD)
- Usuário pode deletar conta e todos os dados

**RNF06: Privacidade da IA**
- Conversas com IA não são compartilhadas com outros usuários
- IA não usa dados de um usuário para treinar ou influenciar respostas a outros
- Dados enviados para OpenAI seguem política de privacidade da OpenAI
- Chamadas à IA via Server Actions (credenciais seguras no servidor)

### 5.3 Escalabilidade

**RNF07: Arquitetura**
- Next.js 16 hospedado na Vercel (edge network global)
- PostgreSQL serverless (Vercel Postgres ou Neon) - auto-scaling
- Server Actions otimizadas automaticamente pelo Next.js
- CDN para assets estáticos (Vercel)
- Edge Functions para operações críticas de IA

**RNF08: Banco de Dados**
- Índices em campos frequentemente consultados (user_id, created_at, status)
- Soft deletes para manter histórico (campo `archived` ou `deleted_at`)
- Connection pooling gerenciado (Drizzle + Vercel Postgres)
- Queries otimizadas com Drizzle (type-safe, sem N+1)

**RNF09: Rate Limiting**
- Implementado via middleware de Server Actions
- Limite de chamadas à IA: 100 mensagens/dia (Free), ilimitado (Pro)
- Limite de criação de hábitos/metas: 10/dia (prevenir spam)
- Upstash Redis para rate limiting distribuído (futuro)

**Exemplo de Rate Limiting:**
```typescript
// lib/safe-action.ts
import { createSafeActionClient } from "next-safe-action";
import { ratelimit } from "@/lib/ratelimit";

export const rateLimitedAction = createSafeActionClient({
  middleware: async ({ ctx }) => {
    const { success } = await ratelimit.limit(ctx.userId);
    if (!success) throw new Error("Rate limit exceeded");
    return ctx;
  },
});
```

### 5.4 Disponibilidade

**RNF10: Uptime**
- Meta de 99.9% de uptime (Vercel SLA)
- PostgreSQL serverless com alta disponibilidade
- Monitoramento com Sentry para erros
- Health checks automáticos

**RNF11: Backup**
- Vercel Postgres faz backup automático (point-in-time recovery)
- Neon oferece branching de database (útil para staging)
- Usuário pode exportar dados a qualquer momento (JSON via Server Action)
- Migrations versionadas com Drizzle (fácil rollback)

### 5.5 Usabilidade

**RNF12: Acessibilidade**
- Suporte a leitores de tela (ARIA labels)
- Contraste mínimo WCAG AA
- Navegação por teclado funcional
- Textos alternativos em imagens

**RNF13: Responsividade**
- Design responsivo (mobile-first)
- Funcional em: Mobile (iOS/Android), Tablet, Desktop
- Breakpoints: 640px (mobile), 768px (tablet), 1024px (desktop)

**RNF14: Feedback ao Usuário**
- Loading states claros em todas as operações assíncronas
- Mensagens de erro específicas e acionáveis
- Confirmações para ações destrutivas (deletar, arquivar)
- Toasts/Snackbars para feedback de ações (ex: "Hábito criado com sucesso")

### 5.6 Manutenibilidade

**RNF15: Código**
- TypeScript para type safety
- ESLint + Prettier para consistência
- Componentes reutilizáveis (shadcn/ui como base)
- Documentação inline em funções complexas

**RNF16: Testes**
- Testes unitários para lógica de negócio crítica
- Testes de integração para fluxos principais
- Meta de cobertura: >70% (futuro)

**RNF17: Monitoramento**
- Logs de erros (Sentry ou similar)
- Analytics de uso (Posthog ou similar)
- Monitoramento de performance (Web Vitals)

---

## 6. Integrações

### 6.1 Better Auth

**INT01: Autenticação**
- Better Auth para registro, login, recuperação de senha
- Sessões server-side seguras (cookies httpOnly)
- OAuth providers (Google, GitHub - futuro)
- Magic links (email passwordless - futuro)
- 2FA (futuro)

**Implementação:**
```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
```

### 6.2 PostgreSQL + Drizzle ORM

**INT02: Database**
- PostgreSQL serverless (Vercel Postgres ou Neon)
- Drizzle ORM para type-safe queries
- Row-level security implementada via middleware de Server Actions
- Migrations versionadas com Drizzle Kit

**Implementação:**
```typescript
// lib/db/index.ts
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

export const db = drizzle(sql, { schema });
```

**INT03: Server Actions**
- next-safe-action para mutations type-safe
- Validação com Zod integrada
- Middleware para autenticação e autorização
- Error handling robusto

**Implementação:**
```typescript
// lib/safe-action.ts
import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";

export const action = createSafeActionClient();

export const authenticatedAction = createSafeActionClient({
  middleware: async () => {
    const session = await auth.api.getSession();
    if (!session) throw new Error("Unauthorized");
    return { userId: session.user.id };
  },
});
```

**INT04: Storage (Futuro)**
- Vercel Blob para avatares de usuários
- Armazenar imagens anexadas a metas/hábitos (futuro)

**INT05: Edge Functions (Vercel)**
- Server Actions para operações de IA (chama OpenAI)
- Decomposição de metas via MCP
- Análise semanal com IA

### 6.2 OpenAI

**INT05: GPT-4 para Mensagens Motivacionais**
- Endpoint: /v1/chat/completions
- Modelo: gpt-4-turbo ou gpt-3.5-turbo (custo-benefício)
- Temperatura: 0.7-0.9 (criatividade moderada)
- Max tokens: 100-150 (mensagens curtas)

**INT06: MCP para Decomposição de Metas**
- Usa Model Context Protocol para análise estruturada
- Retorna JSON com array de subtarefas
- Timeout de 10 segundos

**INT07: Chat Livre**
- Modelo: gpt-4-turbo
- Contexto inclui histórico de conversa (últimas 10 mensagens)
- Max tokens: 500

### 6.3 Sistema de Pagamentos (Futuro MVP, mas arquitetar para)

**INT08: Stripe**
- Checkout para assinatura Pro
- Webhooks para eventos de pagamento
- Portal do cliente para gerenciar assinatura

---

## 7. Modelos de Dados

### 7.1 Schema do Banco de Dados (PostgreSQL/Supabase)

#### Tabela: `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  ai_personality_id UUID REFERENCES ai_personalities(id),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Tabela: `ai_personalities`
```sql
CREATE TABLE ai_personalities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  avatar_url TEXT,
  prompt_template TEXT NOT NULL,
  example_phrases TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Tabela: `habits`
```sql
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  frequency_type TEXT NOT NULL CHECK (frequency_type IN ('daily', 'weekly_specific', 'weekly_count')),
  frequency_config JSONB, -- Ex: {"days": ["monday", "friday"]} ou {"count": 3}
  preferred_time TIME,
  icon TEXT,
  archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Tabela: `habit_completions`
```sql
CREATE TABLE habit_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_habit_completions_habit_id ON habit_completions(habit_id);
CREATE INDEX idx_habit_completions_completed_at ON habit_completions(completed_at);
```

#### Tabela: `goals`
```sql
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('career', 'health', 'studies', 'personal', 'finance', 'other')),
  deadline DATE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Tabela: `subtasks`
```sql
CREATE TABLE subtasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID REFERENCES goals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  deadline DATE,
  completed BOOLEAN DEFAULT FALSE,
  position INTEGER NOT NULL, -- Para ordenação
  ai_generated BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subtasks_goal_id ON subtasks(goal_id);
```

#### Tabela: `ai_messages`
```sql
CREATE TABLE ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  personality_id UUID REFERENCES ai_personalities(id),
  context_type TEXT NOT NULL CHECK (context_type IN ('habit_completion', 'goal_completion', 'subtask_completion', 'streak_milestone', 'weekly_summary', 'chat')),
  context_id UUID, -- ID do hábito, meta, etc.
  message TEXT NOT NULL,
  user_feedback TEXT CHECK (user_feedback IN ('positive', 'negative')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_messages_user_id ON ai_messages(user_id);
```

#### Tabela: `chat_conversations`
```sql
CREATE TABLE chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Tabela: `chat_messages`
```sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_conversation_id ON chat_messages(conversation_id);
```

#### Tabela: `notifications`
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('habit_reminder', 'streak_celebration', 'goal_deadline', 'weekly_summary', 'ai_message')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  action_url TEXT,
  read BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
```

#### Tabela: `user_settings`
```sql
CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  habit_reminders_enabled BOOLEAN DEFAULT TRUE,
  streak_celebrations_enabled BOOLEAN DEFAULT TRUE,
  goal_deadline_alerts_enabled BOOLEAN DEFAULT TRUE,
  weekly_summary_enabled BOOLEAN DEFAULT TRUE,
  ai_messages_enabled BOOLEAN DEFAULT TRUE,
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  weekly_summary_day TEXT DEFAULT 'sunday',
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
  language TEXT DEFAULT 'pt-BR',
  week_starts_on TEXT DEFAULT 'sunday' CHECK (week_starts_on IN ('sunday', 'monday')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 7.2 Row Level Security (RLS) Policies

Todas as tabelas de usuário devem ter políticas RLS para garantir que usuários só acessem seus próprios dados:

```sql
-- Exemplo para tabela habits
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own habits"
  ON habits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own habits"
  ON habits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits"
  ON habits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits"
  ON habits FOR DELETE
  USING (auth.uid() = user_id);
```

Repetir para todas as tabelas com `user_id`.

---

## 8. Casos de Borda e Edge Cases

### 8.1 Hábitos

**EC01: Mudar Frequência de Hábito**
- Se usuário muda frequência (ex: diário → 3x/semana), streak anterior deve ser preservado ou recalculado?
- **Solução**: Salvar histórico de frequências. Cálculo de streak considera frequência vigente na data.

**EC02: Fusos Horários**
- Usuário viaja e muda timezone. "Hoje" deve considerar timezone atual ou original?
- **Solução**: Sempre usar timezone configurado no perfil. Avisar usuário se detectar mudança de timezone (via browser).

**EC03: Marcar Hábito de Dia Passado**
- Usuário esqueceu de marcar ontem. Pode marcar retroativo?
- **Solução**: Permitir marcar até 7 dias atrás. Recalcular streak se necessário.

**EC04: Hábito "Diário" em Feriados**
- Usuário quer pular dias específicos (feriados, viagens)?
- **Solução MVP**: Não há suporte a "pausar" hábito. Usuário pode arquivar temporariamente.
- **Futuro**: Adicionar feature "Pausar hábito por período".

### 8.2 Metas

**EC05: Meta Sem Subtarefas**
- Usuário cria meta mas não adiciona subtarefas. Como calcular progresso?
- **Solução**: Progresso é 0% ou 100% (manual). Usuário marca meta como completa quando alcançada.

**EC06: Adicionar Subtarefa Após Prazo**
- Usuário adiciona subtarefa após deadline da meta passar.
- **Solução**: Permitir. Sistema avisa que meta está atrasada.

**EC07: Deletar Subtarefa Que Já Foi Completa**
- Usuário deleta subtarefa concluída. Progresso diminui?
- **Solução**: Sim, progresso é recalculado. Mostrar aviso antes de deletar.

**EC08: Meta com Subtarefas Geradas por IA**
- Usuário não gosta das subtarefas sugeridas e quer regenerar.
- **Solução**: Botão "Gerar novamente" permite nova tentativa. Limite de 3 gerações/meta (prevenir abuso de API).

### 8.3 IA

**EC09: IA Demora Muito para Responder**
- Chamada para OpenAI falha ou demora >10 segundos.
- **Solução**: Timeout de 10s. Exibir mensagem de erro genérica e permitir tentar novamente.

**EC10: IA Gera Resposta Inapropriada**
- Filtros de conteúdo da OpenAI devem prevenir, mas pode ocorrer.
- **Solução**: Usuário pode reportar mensagem. Sistema marca para revisão. Em casos extremos, usar fallback de mensagem genérica.

**EC11: Usuário Muda Personalidade no Meio do Dia**
- Usuário muda de Yoda para General. Mensagens antigas permanecem?
- **Solução**: Sim, histórico não muda. Novas mensagens usam nova personalidade.

**EC12: Custo de IA Explode**
- Usuário abusa de chat com IA (centenas de mensagens/dia).
- **Solução**: Rate limit de 100 mensagens/dia (Free), ilimitado (Pro mas monitorado). Se usuário Pro excede 1000/dia, alertar.

### 8.4 Notificações

**EC13: Usuário Desativa Permissão de Notificação no Browser**
- Sistema não consegue enviar notificações push.
- **Solução**: Exibir aviso no app pedindo para reativar permissão. Oferecer tutorial.

**EC14: Notificação de Hábito Após Hábito Já Completado**
- Hábito foi completado antes do horário de lembrete.
- **Solução**: Não enviar notificação se hábito já está completo.

**EC15: Múltiplas Notificações no Mesmo Horário**
- Usuário tem 3 hábitos às 8h.
- **Solução**: Agrupar em uma notificação: "Você tem 3 hábitos agendados agora".

### 8.5 Planos e Limites

**EC16: Usuário Free Tenta Criar 4º Hábito**
- Limite é 3.
- **Solução**: Bloquear criação. Exibir modal explicando limite e oferecendo upgrade para Pro.

**EC17: Usuário Pro Cancela Assinatura**
- Após cancelamento, continua Pro até fim do período pago. Depois, downgrade para Free.
- **Solução**: Se tem >3 hábitos ou >1 meta, avisar que precisará arquivar alguns. Não deletar automaticamente.

**EC18: Downgrade com Dados Excedendo Limite**
- Usuário tem 10 hábitos e faz downgrade.
- **Solução**: Permitir visualizar todos, mas não criar novos até arquivar alguns.

---

## 9. Critérios de Aceitação Gerais

### 9.1 Funcionalidade
- ✅ Todas as user stories prioritárias estão implementadas
- ✅ CRUD completo de hábitos e metas funciona sem bugs
- ✅ IA gera mensagens motivacionais consistentes com personalidades
- ✅ Decomposição de metas via MCP retorna subtarefas úteis em >80% dos casos
- ✅ Dashboards carregam sem erros e exibem dados corretos
- ✅ Notificações são enviadas nos horários corretos

### 9.2 Usabilidade
- ✅ Usuário consegue completar onboarding em <2 minutos
- ✅ Criar hábito ou meta leva <30 segundos
- ✅ Interface é intuitiva (teste com 5 usuários: >80% completam tarefas sem ajuda)
- ✅ Mensagens de erro são claras e acionáveis

### 9.3 Performance
- ✅ Dashboard carrega em <2s em 4G
- ✅ Operações de criar/editar salvam em <1s
- ✅ IA responde em <5s para mensagens curtas

### 9.4 Qualidade
- ✅ Sem erros críticos (crashes, perda de dados)
- ✅ Funciona em Chrome, Safari, Firefox (últimas 2 versões)
- ✅ Responsivo em mobile, tablet, desktop
- ✅ Acessibilidade básica (contraste, navegação por teclado)

### 9.5 Negócio
- ✅ Sistema de planos Free/Pro implementado
- ✅ Limites do plano Free são respeitados
- ✅ Upgrade para Pro é possível (mesmo que com pagamento mock para MVP)

---

## 10. Fora do Escopo (Futuro)

### 10.1 Features para Versões Futuras
- 🔮 Gamificação completa (pontos, badges, níveis, rankings)
- 🔮 Integração com WhatsApp/Telegram para lembretes
- 🔮 Integração com calendário (Google Calendar, Outlook)
- 🔮 Compartilhamento social de conquistas
- 🔮 Comunidade/grupos de accountability
- 🔮 Integração com wearables (Fitbit, Apple Watch)
- 🔮 Dashboards preditivos com ML (previsão de sucesso de metas)
- 🔮 Modo offline (PWA completo com sync)
- 🔮 API pública para integrações
- 🔮 Mais personalidades de IA (100+ opções)
- 🔮 IA customizável (usuário define tom e estilo)
- 🔮 Templates de hábitos e metas (baseados em objetivos comuns)
- 🔮 Journaling integrado
- 🔮 Análise de humor/energia (correlação com hábitos)

### 10.2 Melhorias Técnicas Futuras
- 🔧 Migração para Rust/Go para Edge Functions (performance)
- 🔧 Implementar service workers para offline
- 🔧 Self-hosted LLM para reduzir custos de IA
- 🔧 Websockets para updates em tempo real
- 🔧 GraphQL em vez de REST (se complexidade crescer)

---

## 11. Glossário

- **Hábito**: Ação recorrente que o usuário deseja manter (ex: meditar diariamente)
- **Meta**: Objetivo com prazo definido que pode ser decomposto em subtarefas
- **Subtarefa**: Passo específico para alcançar uma meta
- **Streak**: Sequência de dias consecutivos completando um hábito
- **Personalidade**: Estilo de coaching da IA (ex: Mestre Yoda, General Motivador)
- **MCP (Model Context Protocol)**: Protocolo usado para que a IA analise e decomponha metas em subtarefas estruturadas
- **Dashboard**: Painel visual que exibe progresso e estatísticas
- **Free**: Plano gratuito com funcionalidades limitadas
- **Pro**: Plano pago com funcionalidades completas
- **Onboarding**: Processo de introdução do usuário ao app
- **RLS (Row Level Security)**: Política de segurança do Supabase que garante isolamento de dados por usuário

---

## 12. Referências e Inspirações

### 12.1 Apps de Referência
- **Habitica**: Gamificação de hábitos
- **Streaks**: Minimalismo e foco em streaks
- **Loop Habit Tracker**: Open-source, estatísticas robustas
- **Notion**: Flexibilidade e UX clean
- **Linear**: Design moderno, animações sutis

### 12.2 Referências de Design
- Linear.app - Interface limpa e moderna
- Resend.com - Minimalismo e tipografia
- Vercel.com - Uso de espaços em branco e hierarquia

### 12.3 Tecnologias
- Next.js 16: https://nextjs.org/docs
- Drizzle ORM: https://orm.drizzle.team/docs
- Better Auth: https://www.better-auth.com/docs
- next-safe-action: https://next-safe-action.dev
- Zod: https://zod.dev
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- Neon (alternativa): https://neon.tech/docs
- shadcn/ui: https://ui.shadcn.com
- OpenAI API: https://platform.openai.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

---

**Versão**: 1.0  
**Data**: Janeiro 2026  
**Autor**: Product Discovery Assistant  
**Status**: Aprovado para Desenvolvimento
