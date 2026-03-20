## 1. Refatoração Técnica (TDD)

- [x] 1.1 [TDD-TEST] Garantir que todos os testes atuais em `src/app/(private)/habits/actions/get-habits.test.ts` estão passando.
- [x] 1.2 [TDD-IMPL] Extrair lógica de filtros para uma função auxiliar `buildHabitFilters`.
- [x] 1.3 [TDD-IMPL] Implementar a query única com subquery para `completedToday` em `getHabitsAction`.
- [x] 1.4 [TDD-IMPL] Otimizar o processamento de `weeklyCountMap`.

## 2. Qualidade e Verificação

- [x] 2.1 [QUALITY] Rodar `npm run test` e garantir que não houve regressões.
- [x] 2.2 [QUALITY] Rodar `npx tsc --noEmit` para validar integridade de tipos.
- [x] 2.3 [QUALITY] Rodar `npx eslint .` para garantir conformidade com padrões.
