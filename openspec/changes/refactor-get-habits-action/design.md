## Context

A `getHabitsAction` é uma função central que realiza a listagem de hábitos com filtros e paginação. Atualmente, ela executa várias queries sequenciais e processa dados em memória para determinar o status de conclusão de hoje.

## Goals / Non-Goals

**Goals:**
- Centralizar a lógica de busca de hábitos em uma query principal com subqueries.
- Melhorar a separação de interesses.
- Manter 100% de compatibilidade com os testes existentes.

**Non-Goals:**
- Alterar as tabelas do banco de dados.
- Adicionar novas funcionalidades para o usuário.

## Decisions

### 1. Utilização de Subquery para `completedToday`
Em vez de buscar todas as execuções de hoje em uma query separada e criar um `Set` em memória, utilizaremos uma subquery no `select` principal para retornar um booleano `completedToday`.

### 2. Extração de `buildHabitFilters`
A construção do `whereClause` será movida para uma função pura auxiliar, tornando-a mais fácil de testar isoladamente se necessário.

### 3. Otimização de `weeklyCount`
A busca de contagens semanais continuará separada (devido à complexidade de agregação por período), mas será executada apenas se houver hábitos do tipo `weekly_count` na página atual.

## Risks / Trade-offs

- **[Risco]** Complexidade da query SQL gerada pelo Drizzle com subqueries. → **Mitigação**: Validar o SQL gerado via `db.select(...).toSQL()` se necessário.

## Test Plan

O plano de teste consiste em garantir que a suite de testes existente (`src/app/(private)/habits/actions/get-habits.test.ts`) continue passando integralmente, sem necessidade de alterações no código de teste.
