## 1. Infraestrutura e Tipagem

- [x] 1.1 Atualizar `src/app/(private)/habits/types.ts` para incluir o tipo de filtro de status.
- [x] 1.2 Atualizar o esquema Zod (se necessário) para validar o parâmetro de status nas queries.

## 2. Server Actions (TDD)

- [x] 2.1 [TDD-TEST] Criar testes unitários para `getHabitsAction` em `src/app/(private)/habits/actions/get-habits.test.ts` validando os filtros "pending" e "completed".
- [x] 2.2 [TDD-IMPL] Modificar `src/app/(private)/habits/actions/get-habits.ts` para implementar a lógica de filtragem por status no banco de dados.
- [x] 2.3 [QUALITY] Executar `npm run test` e garantir que todos os testes de `get-habits` passsem.

## 3. Componentes de UI - Filtros e Header

- [x] 3.1 [TDD-TEST] Criar teste de componente para as novas abas de filtro e busca em `src/app/(private)/habits/components/habits-filters.test.tsx`.
- [x] 3.2 [TDD-IMPL] Implementar o componente de filtros (`HabitFilters`) seguindo o design do Pencil (Search + Tabs).
- [x] 3.3 [TDD-IMPL] Atualizar o header em `HabitsContent` para seguir o novo estilo (font-size 48px, tracking, etc.).

## 4. Componente HabitCard (TDD)

- [x] 4.1 [TDD-TEST] Criar/atualizar testes para `HabitCard` em `src/app/(private)/habits/components/habit-card.test.tsx` refletindo o novo layout.
- [x] 4.2 [TDD-IMPL] Atualizar `src/app/(private)/habits/components/habit-card.tsx` com o novo design (padding 24px, gap 16px, novos estilos de texto).

## 5. Integração e Layout Principal

- [x] 5.1 [TDD-IMPL] Atualizar `src/app/(private)/habits/components/habits-content.tsx` para integrar os novos filtros, header e layout de lista.
- [x] 5.2 [TDD-IMPL] Garantir a responsividade mobile no layout principal de hábitos seguindo o design do Pencil.

## 6. Qualidade e Verificação Final

- [x] 6.1 [QUALITY] Rodar `npx eslint .` e corrigir eventuais avisos ou erros.
- [x] 6.2 [QUALITY] Rodar `npx tsc --noEmit` para garantir integridade dos tipos.
- [x] 6.3 [QUALITY] Executar todos os testes (`npm run test`) e validar o fluxo completo.
- [ ] 6.4 [QUALITY] Validar visualmente via screenshot ou preview local se o design está fiel ao `pencil-new.pen`.
