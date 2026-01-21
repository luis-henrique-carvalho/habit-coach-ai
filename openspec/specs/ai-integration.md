# AI Integration & Personality System Specification

## Overview
Specification for OpenAI GPT-4 integration with character-driven personality system and MCP (Model Context Protocol) for goal decomposition.

**Related:** `@/docs/BRIEF.md` Principais Funcionalidades, `@/docs/MVP-SCOPE.md` IA com Personalidades

---

## Personality System (MVP)

### Persona 1: Mestre Yoda (Sábio e Encorajador)
**Características:**
- Inverte estrutura das frases (Yoda-style)
- Usa sabedoria e filosofia
- Motivação tranquila e profunda
- Referências a Star Wars e sabedoria oriental

**Example Messages:**
- Hábito completado: "Forte você está hoje! Próximo passo, dar, você deve."
- Falha em hábito: "Falhar, aprender, nós todos. Tentar novamente, você pode."
- Streak 7 dias: "Sete sóis passaram. Mestre em paciência, você é."
- Meta alcançada: "Alvo atingiu você. Caminho do guerreiro, seguir, você continua."

**System Prompt:**
```
Você é Mestre Yoda, um sábio e encorajador coach de hábitos e metas.
Características:
1. INVERTE a ordem das palavras (estrutura Yoda)
2. Usa sabedoria oriental e filosofia
3. Faz referências a Star Wars (discretamente)
4. Motiva com tranquilidade e profundidade
5. Celebra pequenas vitórias
6. Reconforta sem julgamento
7. Sempre positivo, nunca punitivo

Exemplos de inversão:
- Normal: "Você foi muito bem hoje"
- Yoda: "Muito bem foi você, hoje"

Nunca quebre o personagem. Sempre responda como Yoda.
```

### Persona 2: General Motivador (Direto e Intenso)
**Características:**
- Linguagem militar e motivacional
- Direto, sem meias-palavras
- Celebra esforço e disciplina
- Linguagem energética e intensa

**Example Messages:**
- Hábito completado: "SOLDADO, MAIS UM HÁBITO CONQUISTADO! Assim se faz! Força!"
- Falha em hábito: "Você tropeçou? LEVANTA! Militar não desiste, você também não!"
- Streak 7 dias: "SETE DIAS! Disciplina é a diferença entre vencedores e perdedores. PARABÉNS!"
- Meta alcançada: "MISSÃO CUMPRIDA! Soldado, você é forte!"

**System Prompt:**
```
Você é General Motivador, um coach militar e intenso.
Características:
1. MAIÚSCULAS para ênfase
2. Linguagem militar (soldado, batalha, missão, etc)
3. Muito energético e motivador
4. Celebra disciplina e esforço
5. Direto, sem rodeios
6. Reconhece força e determinação
7. Nunca permite pena de si mesmo

Tons:
- Sucesso: "MISSÃO CUMPRIDA!" energia alta
- Falha: Reconhecer, mas levantar imediatamente
- Análise: Direto e prático

Sempre fale como um general motivador.
```

### Persona 3: Mentor Empático (Gentil e Compreensivo)
**Características:**
- Gentil, empático, não julgador
- Suporta emocionalmente
- Celebra processo, não apenas resultado
- Linguagem acolhedora

**Example Messages:**
- Hábito completado: "Que lindo! Você deu um passo hoje. Cada pequeno gesto importa."
- Falha em hábito: "Dias difíceis acontecem. Você é valioso mesmo quando falha. Que tal tentar amanhã?"
- Streak 7 dias: "Sete dias! Vejo como você está cuidando de si mesmo. Estou orgulhoso de você."
- Meta alcançada: "Você fez! Que jornada especial foi sua. Parabéns por nunca desistir."

**System Prompt:**
```
Você é Mentor Empático, um coach gentil e compreensivo.
Características:
1. Extremamente gentil e empático
2. Nunca julga
3. Reconhece emoções e dificuldades
4. Celebra processo, não apenas resultado
5. Usa linguagem acolhedora e carinhosa
6. Apoia emocionalmente
7. Valida sentimentos

Tons:
- Sucesso: Celebra com calor e genuinidade
- Falha: Reconforta, valida, incentiva a tentar novamente
- Análise: Compreensivo e prático

Sempre fale como um mentor gentil.
```

---

## Personality Selection

### Onboarding Flow
```
1. Usuário faz login
2. Vê tela: "Escolha seu Coach Pessoal"
3. Vê cards com 3 personalidades:
   - Mestre Yoda (card com theme Jedi)
   - General Motivador (card com theme militar)
   - Mentor Empático (card com theme acolhedor)
4. Clica em um e seleciona
5. Mensagem personalizada da escolha
6. Pode mudar em settings depois
```

### Database Schema
```typescript
export const users = pgTable('users', {
  // ... outras colunas
  selectedPersonality: text('selected_personality')
    .default('yoda')
    .notNull(), // 'yoda' | 'general' | 'mentor'
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const personalityLogs = pgTable('personality_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  personality: text('personality').notNull(),
  messageType: text('message_type').notNull(), // 'habit_complete', 'habit_fail', etc
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
```

---

## Message Generation Flow

### Trigger Events
1. **Hábito Completo:** Usuário marca hábito como feito
2. **Hábito Falho:** Usuário falha 3 dias consecutivos (alerta encorajador)
3. **Streak Milestone:** 7, 14, 30, 60, 90 dias
4. **Meta Completa:** Todas as subtarefas concluídas
5. **Análise Semanal:** Toda segunda-feira, análise automática
6. **Chat Livre:** Usuário envia pergunta no chat

### Generation Process

```typescript
// actions/generateMotivationalMessage.ts
'use server'

import { openai } from '@/lib/openai'
import { getSession } from '@/auth'

export const actionGenerateMessage = createAction()
  .schema(generateMessageSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession()
    const { triggerType, context } = parsedInput
    
    // 1. Get user's selected personality
    const user = await getUserById(session.user.id)
    const personality = user.selectedPersonality // 'yoda' | 'general' | 'mentor'
    
    // 2. Build system prompt based on personality
    const systemPrompt = getPersonalityPrompt(personality)
    
    // 3. Build user message with context
    const userMessage = buildContextMessage(triggerType, context)
    
    // 4. Call OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      system: systemPrompt,
      messages: [
        { role: 'user', content: userMessage },
      ],
      temperature: 0.8, // Slightly random for personality feel
      max_tokens: 200,
    })
    
    const message = response.choices[0].message.content
    
    // 5. Log to database
    await db.insert(personalityLogs).values({
      userId: session.user.id,
      personality,
      messageType: triggerType,
      message,
    })
    
    return { message }
  })
```

### Context Messages

**Habit Complete:**
```
Usuário completou hábito "{habitName}" na sequência de {streakDays} dias.
Gere uma mensagem motivacional de {personality} celebrando essa vitória.
```

**Habit Fail (3 days consecutive):**
```
Usuário falhou em completar hábito "{habitName}" por 3 dias consecutivos.
Última vez completo: {lastDate}.
Gere uma mensagem encorajadora de {personality}, reconfortando sem julgar.
```

**Streak Milestone:**
```
Usuário atingiu {streakDays} dias consecutivos do hábito "{habitName}".
Essa é uma sequência importante!
Gere uma mensagem celebrando essa conquista como {personality}.
```

**Goal Complete:**
```
Usuário completou meta "{goalName}" com {taskCount} subtarefas.
Tempo para conclusão: {daysToComplete} dias.
Gere uma mensagem celebrando a conclusão dessa meta como {personality}.
```

**Weekly Analysis:**
```
Análise semanal do usuário:
- Hábitos: {habitsSummary}
- Metas: {goalsSummary}
- Taxa de conclusão: {completionRate}%
- Padrões: {patterns}

Gere uma análise e motivação para a semana como {personality}.
```

---

## MCP Integration (Goal Decomposition)

### Overview
Model Context Protocol (MCP) for automatically decomposing complex goals into actionable subtasks.

### Goal Decomposition Flow

```
1. Usuário cria meta: "Aprender React Native"
2. Sistema chama actionGenerateSubtasks
3. MCP processa meta e gera subtarefas
4. Mostra sugestões ao usuário
5. Usuário confirma ou edita
6. Subtarefas são salvas
```

### Implementation

```typescript
// actions/generateSubtasks.ts
'use server'

import { openai } from '@/lib/openai'
import { getSession } from '@/auth'

export const actionGenerateSubtasks = createAction()
  .schema(generateSubtasksSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession()
    const { goalTitle, goalDescription, deadline } = parsedInput
    
    // 1. Build MCP prompt
    const mcpPrompt = `
    Você é um especialista em planejamento e decomposição de objetivos.
    
    Objetivo: "${goalTitle}"
    Descrição: "${goalDescription}"
    Prazo: ${deadline ? `${deadline} dias` : 'Sem prazo específico'}
    
    Decomponha esse objetivo em 5-10 subtarefas concretas, mensuráveis e viáveis.
    Cada subtarefa deve:
    1. Ser acionável em 1-3 dias
    2. Ter um critério de sucesso claro
    3. Ser sequencial quando necessário
    4. Incluir estimativa de tempo
    
    Retorne como JSON:
    {
      "subtasks": [
        {
          "title": "string",
          "description": "string",
          "estimatedDays": number,
          "criteria": "string"
        }
      ],
      "reasoning": "string"
    }
    `
    
    // 2. Call OpenAI for decomposition
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'user', content: mcpPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })
    
    // 3. Parse response
    const rawContent = response.choices[0].message.content
    const parsed = JSON.parse(rawContent)
    
    // 4. Return suggestions (not yet saved)
    return {
      subtasks: parsed.subtasks,
      reasoning: parsed.reasoning,
    }
  })

// actions/confirmSubtasks.ts - User confirms and saves
'use server'

export const actionConfirmSubtasks = createAction()
  .schema(confirmSubtasksSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession()
    const { goalId, subtasks } = parsedInput
    
    // Save subtasks to database
    for (const subtask of subtasks) {
      await db.insert(goalSubtasks).values({
        goalId,
        title: subtask.title,
        description: subtask.description,
        estimatedDays: subtask.estimatedDays,
        criteria: subtask.criteria,
        status: 'pending',
      })
    }
    
    return { success: true }
  })
```

### Database Schema

```typescript
export const goals = pgTable('goals', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category').notNull(), // 'career', 'health', etc
  deadline: date('deadline'),
  status: text('status').default('active'), // 'active' | 'completed' | 'archived'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const goalSubtasks = pgTable('goal_subtasks', {
  id: text('id').primaryKey(),
  goalId: text('goal_id').notNull().references(() => goals.id),
  title: text('title').notNull(),
  description: text('description'),
  estimatedDays: integer('estimated_days'),
  criteria: text('criteria'), // Success criteria
  status: text('status').default('pending'), // 'pending' | 'in_progress' | 'completed'
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
```

---

## Free Tier Limits

### Personality Messages (MVP)
- **Free Users:** 5 messages/day
- **Pro Users:** Unlimited messages

### Goal Decomposition (MVP)
- **Free Users:** 1 decomposition/week
- **Pro Users:** Unlimited decompositions/day

### Chat Messages (MVP)
- **Free Users:** 10 chat messages/day
- **Pro Users:** Unlimited chat messages

---

## Error Handling

### OpenAI API Errors
```typescript
try {
  const response = await openai.chat.completions.create(...)
} catch (error) {
  if (error.code === 'rate_limit_exceeded') {
    return { error: 'Too many requests. Try again later.' }
  }
  if (error.code === 'insufficient_quota') {
    // Log critical error
    return { error: 'System error. Please contact support.' }
  }
  throw error
}
```

### Fallback Messages
```typescript
// If API fails, use pre-generated fallback
const fallbacks = {
  yoda: "Tentar novamente, você pode. Falhar, nada é.",
  general: "SOLDADO, TENTE NOVAMENTE! Força!",
  mentor: "Tudo bem. Você é forte. Vamos tentar de novo?"
}

return fallbacks[personality]
```

---

## Testing & Validation

### Unit Tests
```typescript
describe('Personality System', () => {
  it('should generate message for each personality', async () => {
    for (const personality of ['yoda', 'general', 'mentor']) {
      const message = await generateMessage(personality, 'habit_complete', {})
      expect(message).toBeTruthy()
      expect(message.length).toBeGreaterThan(0)
    }
  })
})
```

### Quality Metrics
- Message relevance: > 90% (validated with users)
- Response time: < 2 seconds
- Error rate: < 1%

---

## Future Enhancements

1. **Fine-tuning:** Train model on curated personality examples
2. **More Personalities:** Add 3-5 more (Mr. Rogers, Tony Robbins, etc)
3. **Voice:** Text-to-speech with personality-specific voice
4. **Personalization:** Learn user preferences (formality, language, etc)
5. **Conversation Memory:** Multi-turn conversations, context awareness
6. **Advanced Analytics:** AI-powered insights on behavior patterns
