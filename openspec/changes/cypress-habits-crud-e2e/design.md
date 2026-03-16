## Context

O módulo de hábitos é o feature core da plataforma Habit Coach AI. A aplicação usa Next.js com App Router, shadcn/ui para componentes, Server Actions via `next-safe-action` com validação Zod, e Drizzle ORM com PostgreSQL. O CRUD completo de hábitos já está implementado e funcional, mas não possui cobertura E2E com Cypress.

**Estado atual:**
- Cypress já está instalado e configurado (`cypress.config.ts`)
- Existe um custom command `cy.login()` que limpa o banco de teste e registra o usuário via Better Auth
- A API de seed (`/api/test/seed`) já limpa dados do usuário de teste
- A pasta `cypress/e2e/` está vazia — sem nenhum teste existente
- Os componentes usam shadcn Dialog, Select, DropdownMenu, Input, Textarea, Button

**Fluxos CRUD existentes:**
1. **Create**: Botão "Adicionar Hábito" → Dialog `UpsertHabitForm` → Formulário com campos (nome, descrição, frequência, hora preferida) → Submit via `upsertHabitAction`
2. **Read**: Listagem em `/habits` com `HabitsContent` → `HabitCard` para cada hábito → Busca via query param
3. **Update**: Menu contexto (DropdownMenu) no `HabitCard` → "Editar" → Abre `UpsertHabitForm` com dados preenchidos → Submit atualiza
4. **Archive**: Menu contexto → "Arquivar" → Dialog de confirmação → `archiveHabitAction` seta `isActive = false`
5. **Toggle Completion**: Botão circular no `HabitCard` → `toggleHabitCompletionAction` → Toggle optimistic
6. **Detail View**: Click no nome do hábito → `/habits/[id]` → Stats, Heatmap, Trend Chart

## Goals / Non-Goals

**Goals:**
- Cobertura E2E completa do CRUD de hábitos com Cypress
- Organização da pasta `cypress/e2e/` por módulo/funcionalidade
- Custom commands reutilizáveis para operações comuns de hábitos
- Testes confiáveis e não-flaky, com waits baseados em estado do DOM
- Validação de formulários (campos obrigatórios, limites)
- Compatibilidade com pipeline CI existente

**Non-Goals:**
- Testes de performance ou load testing
- Testes de acessibilidade (a11y) automatizados (pode ser adicionado depois)
- Testes de responsividade mobile (viewport fixo em 1280x720)
- Testes do sistema de streaks/heatmap/trend chart no detalhe (apenas verificar que a página carrega)
- Testes de outros módulos (metas, IA, etc.)

## Decisions

### 1. Organização por funcionalidade CRUD

**Decisão**: Separar os testes em arquivos por operação CRUD, dentro de um diretório `habits/`.

```
cypress/e2e/
└── habits/
    ├── create-habit.cy.ts
    ├── read-habits.cy.ts
    ├── update-habit.cy.ts
    ├── archive-habit.cy.ts
    ├── toggle-completion.cy.ts
    └── habit-detail.cy.ts
```

**Rationale**: Cada arquivo foca em uma única responsabilidade, facilitando manutenção e debugging. A estrutura modular (`habits/`) permite escalar com novos módulos (ex: `goals/`, `ai-chat/`).

**Alternativa considerada**: Um único arquivo `habits.cy.ts` com todos os testes → Descartado por gerar arquivos muito longos e dificultar execução seletiva.

### 2. Custom Commands para reutilização

**Decisão**: Criar custom commands Cypress em `cypress/support/commands.ts` para operações repetitivas:

- `cy.createHabit(name, options?)`: Abre o dialog, preenche o formulário, submete e aguarda criação
- `cy.openHabitMenu(habitName)`: Localiza o card do hábito e abre o DropdownMenu

**Rationale**: Reduz duplicação nos testes, centraliza a lógica de interação com componentes shadcn/ui (Dialog trigger, Select, etc.), e facilita manutenção se a UI mudar.

### 3. Estratégia de interação com componentes shadcn/ui

**Decisão**: Usar seletores baseados em `role`, `text`, `aria-label` e `data-testid` quando necessário. Interações com Dialog, Select e DropdownMenu via Radix primitives.

**Abordagem por componente:**
- **Dialog**: Detectar via `role="dialog"` e conteúdo textual
- **Select (Radix)**: Click no trigger → click na opção pelo texto
- **DropdownMenu**: Trigger via botão de ações → itens pelo texto
- **Input/Textarea**: Seleção por `id` (já definidos nos componentes) ou `placeholder`
- **Button**: Seleção por texto do botão (ex: "Criar", "Atualizar", "Arquivar")

**Rationale**: Evita depender de classes CSS frágeis. Seletores semânticos são mais resistentes a mudanças de estilo.

### 4. Isolamento de testes e estado

**Decisão**: Cada arquivo de teste executa `cy.login()` no `beforeEach`, que limpa o banco e cria um usuário novo. Testes que dependem de dados pré-existentes criam os hábitos necessários no setup usando `cy.createHabit()`.

**Rationale**: Garante isolamento completo — cada teste começa com banco limpo. Evita dependências de ordem de execução entre testes.

### 5. Esperas (waits) e asserções

**Decisão**: Nunca usar `cy.wait(ms)` fixo. Usar esperas baseadas em estado do DOM:
- `cy.contains()` para aguardar texto aparecer
- `.should('exist')` / `.should('not.exist')` para aguardar elementos
- `cy.intercept()` + `cy.wait('@alias')` para esperar respostas de rede quando necessário
- Toast messages como confirmação de operações bem-sucedidas

**Rationale**: Elimina flaky tests causados por timing. Tests se adaptam à velocidade do ambiente (local vs CI).

## Risks / Trade-offs

- **[Risco] Interação com componentes Radix UI pode ser instável** → Mitigation: Testar com triggers event nativos e forçar visibilidade quando necessário. Usar `{ force: true }` apenas se inevitável e documentar o motivo.

- **[Risco] O DropdownMenu do `HabitCard` tem opacity-0 por padrão (aparece no hover)** → Mitigation: Usar `cy.get(...).invoke('show')` ou fazer hover explícito antes do click. Alternativa: adicionar `data-testid` no trigger.

- **[Trade-off] Velocidade vs Isolamento**: Limpar o banco a cada teste (via `cy.login()`) adiciona overhead. → Aceito: Confiabilidade vale mais que velocidade para E2E.

- **[Risco] Limite de 3 hábitos no plano Free** → Mitigation: Testes de criação devem considerar o limite e, quando necessário, arquivar hábitos antes de criar novos. Os testes devem incluir cenários que validem essa restrição.

## Test Plan

### Tipos de Teste
- **E2E (Cypress)**: Todos os testes nesta change são E2E, simulando interações reais do usuário

### Estratégia de Mock
- **Sem mocks**: Os testes E2E interagem com o banco de dados real (teste) e a aplicação real rodando localmente
- **Seed/Cleanup**: Via `cy.login()` → `/api/test/seed` (já existente) + sign-up via Better Auth
- **Dados de teste**: Criados programaticamente via `cy.createHabit()` custom command

### Casos de Teste Detalhados

| Arquivo | Cenários |
|---|---|
| `create-habit.cy.ts` | Criar hábito diário; Criar hábito com dias específicos; Criar hábito com X vezes/semana; Validação de campo obrigatório (nome); Limite de 3 hábitos |
| `read-habits.cy.ts` | Listar hábitos criados; Estado vazio (sem hábitos); Busca por nome |
| `update-habit.cy.ts` | Editar nome do hábito; Editar tipo de recorrência |
| `archive-habit.cy.ts` | Arquivar hábito com confirmação; Cancelar arquivamento |
| `toggle-completion.cy.ts` | Marcar hábito como concluído; Desmarcar hábito |
| `habit-detail.cy.ts` | Navegar para detalhe; Verificar informações exibidas; Voltar para listagem |
