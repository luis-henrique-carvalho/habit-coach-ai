## Why

Refatorar a action `getHabitsAction` para melhorar a legibilidade, manutenibilidade e performance. Atualmente, a função acumula múltiplas responsabilidades (autenticação, paginação, construção de query complexa, mapeamento de status) que podem ser modularizadas e otimizadas através de subqueries do Drizzle.

## What Changes

- **Otimização de Query**: Utilizar subqueries para buscar o status de conclusão de hoje diretamente na query principal de hábitos, reduzindo o número de chamadas ao banco.
- **Modularização**: Extrair a lógica de construção de filtros e mapeamento de status para funções auxiliares ou serviços.
- **Tipagem Explícita**: Melhorar a clareza dos tipos de entrada e saída, garantindo conformidade com os padrões do projeto.
- **Melhoria de Performance**: Reduzir loops e processamento em memória ao trazer dados já estruturados do banco.

## Capabilities

### New Capabilities
- N/A

### Modified Capabilities
- N/A (A funcionalidade e os requisitos permanecem os mesmos, apenas a implementação técnica é alterada).

## Impact

- **Server Actions**: `src/app/(private)/habits/actions/get-habits.ts`.
- **Testes**: `src/app/(private)/habits/actions/get-habits.test.ts` (devem continuar passando sem alterações nos casos de teste).
