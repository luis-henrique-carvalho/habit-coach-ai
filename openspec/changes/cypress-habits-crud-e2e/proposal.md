## Why

O módulo de hábitos é o core da plataforma e atualmente não possui testes end-to-end com Cypress cobrindo o fluxo completo de CRUD (Create, Read, Update, Archive). Sem essa cobertura E2E, regressões visuais e de integração no fluxo do usuário podem passar despercebidas em deploy. Além disso, a pasta `cypress/e2e/` está vazia e sem organização por módulo/funcionalidade, dificultando a escalabilidade futura dos testes.

## What Changes

- **Criar testes E2E com Cypress** cobrindo o CRUD completo de hábitos:
  - **Create**: Criar hábito com diferentes tipos de recorrência (daily, weekly, weekly_count) via dialog modal
  - **Read**: Verificar que hábitos criados aparecem na listagem e que a busca funciona
  - **Update**: Editar um hábito existente via menu de contexto → dialog de edição
  - **Archive**: Arquivar um hábito via menu de contexto → dialog de confirmação
  - **Toggle Completion**: Marcar/desmarcar hábito como concluído no dia
  - **Detail View**: Navegar para a página de detalhe do hábito e verificar informações
- **Reorganizar a estrutura de `cypress/e2e/`** por módulo/funcionalidade:
  ```
  cypress/e2e/
  ├── habits/
  │   ├── create-habit.cy.ts
  │   ├── read-habits.cy.ts
  │   ├── update-habit.cy.ts
  │   ├── archive-habit.cy.ts
  │   ├── toggle-completion.cy.ts
  │   └── habit-detail.cy.ts
  ```
- **Adicionar custom commands Cypress** específicos para hábitos (ex: `cy.createHabit()`, `cy.openHabitMenu()`) para reutilização
- **Validar interações com formulários** usando componentes shadcn/ui (Dialog, Select, Input, etc.)

## Capabilities

### New Capabilities
- `habits-e2e-tests`: Testes E2E Cypress cobrindo todo o fluxo CRUD de hábitos com organização modular e custom commands reutilizáveis

### Modified Capabilities
- `habits-testing-suite`: Expandir os cenários de E2E testing descritos na spec existente com casos de teste detalhados e validações específicas para cada operação CRUD

## Impact

- **Código afetado**: `cypress/e2e/` (criação de novos arquivos de teste), `cypress/support/commands.ts` (novos custom commands)
- **Dependências**: Cypress (já instalado), aplicação Next.js rodando localmente, banco de testes configurado
- **Infraestrutura**: API de seed (`/api/test/seed`) e custom command `cy.login()` já existentes
- **CI/CD**: Os novos testes devem ser compatíveis com o pipeline CI existente
