## Context

A página de hábitos atual utiliza componentes padrão do `shadcn/ui` e uma estrutura de layout simplificada. O novo design proposto no `pencil-new.pen` introduz uma estética mais refinada, com cards maiores, um sistema de abas para filtragem por status e uma barra de busca integrada.

## Goals / Non-Goals

**Goals:**
- Implementar o novo layout da página de hábitos conforme `pencil-new.pen`.
- Adicionar suporte a filtragem por status (Todos, Pendentes, Concluídos) via search params.
- Atualizar o componente `HabitCard` para o novo design.
- Garantir responsividade mobile seguindo o novo design de tela mobile.

**Non-Goals:**
- Alterar a lógica de streaks ou de marcação de conclusão.
- Modificar o formulário de criação/edição de hábitos (exceto gatilhos visuais).
- Alterar o `AppSidebar` global nesta etapa (focaremos apenas no conteúdo da página).

## Decisions

### 1. Filtragem por Status via Search Params
Utilizaremos um novo parâmetro de busca `status` (`all`, `pending`, `completed`) para controlar a visualização.
- **Racional**: Mantém a página como um Server Component, permite compartilhamento de links com filtros aplicados e facilita a paginação correta vinda do banco de dados.

### 2. Atualização do `getHabitsAction`
O Server Action será modificado para aceitar o parâmetro `status` e aplicar a lógica de filtro no Drizzle ORM.
- **Lógica**:
    - `all`: Comportamento atual.
    - `pending`: `WHERE NOT EXISTS (habitExecution where date = today)`.
    - `completed`: `WHERE EXISTS (habitExecution where date = today)`.

### 3. Componentes de UI Customizados
Em vez de depender apenas das classes padrão de `PageContainer`, aplicaremos estilos específicos (Tailwind CSS) no `HabitsContent` para refletir as propriedades exatas do design (gaps de 40px, cards com padding de 24px, etc.).

### 4. Tabs de Filtro
Utilizaremos o componente `Tabs` do shadcn/ui, mas estilizado para combinar com o design do Pencil, ou um conjunto customizado de botões para as abas.

## Risks / Trade-offs

- **[Risco]** Complexidade na query de paginação com join de execuções. → **Mitigação**: Otimizar a query utilizando subqueries ou garantindo índices adequados em `habit_execution(habit_id, completed_date)`.
- **[Risco]** Divergência entre o `AppSidebar` atual e o design do Pencil. → **Mitigação**: O layout privado (`PrivateLayout`) continuará provendo o sidebar atual, mas o conteúdo da página será centralizado para não causar estranheza visual.

## Test Plan

### Casos de Teste Detalhados

1. **Listagem Inicial**:
    - Verificar se todos os hábitos ativos são carregados por padrão (`status=all`).
    - Validar se a busca por nome continua funcionando em conjunto com os filtros.

2. **Filtro "Pendentes"**:
    - Selecionar "Pendentes".
    - Verificar se apenas hábitos não concluídos hoje aparecem.
    - Marcar um hábito como concluído e verificar se ele desaparece da lista (após revalidação).

3. **Filtro "Concluídos"**:
    - Selecionar "Concluídos".
    - Verificar se apenas hábitos concluídos hoje aparecem.

4. **Responsividade**:
    - Validar o layout em viewport mobile (375px) garantindo que os cards se ajustem e a barra superior/inferior apareça se implementada.

### Tipos de Teste
- **Unitário**: Testar a lógica de filtro no `getHabitsAction`.
- **Integração**: Testar o componente `HabitsContent` com diferentes `searchParams`.
- **E2E (Cypress)**: Fluxo completo de busca, filtragem e marcação de conclusão.

### Estratégias de Mock
- **Banco de Dados**: Utilizar `vitest` com mocks do `db` para testes unitários da action.
- **Auth**: Mockar a sessão do usuário utilizando os helpers já existentes no projeto (`test/setup.ts`).
