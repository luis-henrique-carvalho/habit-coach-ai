## 1. Setup e Infraestrutura

- [x] 1.1 [TDD-TEST] Criar estrutura de diretórios `cypress/e2e/habits/`
  - **Arquivo**: `cypress/e2e/habits/` (diretório)
  - **Descrição**: Criar o diretório modular para abrigar os testes de hábitos, seguindo o padrão de organização por módulo/funcionalidade

- [x] 1.2 [TDD-IMPL] Adicionar custom commands Cypress para hábitos
  - **Arquivo**: `cypress/support/commands.ts`
  - **Descrição**: Implementar os custom commands `cy.createHabit(name, options?)` e `cy.openHabitMenu(habitName)` com tipagem TypeScript completa
  - **Detalhes**:
    - `cy.createHabit(name, options?)`: Abre dialog "Novo Hábito", preenche formulário (nome, descrição, recurrência), clica "Criar", aguarda toast de sucesso
    - `cy.openHabitMenu(habitName)`: Localiza card do hábito pelo nome, hover no trigger do DropdownMenu, click para abrir
    - Adicionar declarações TypeScript no namespace `Cypress.Chainable`

## 2. Testes E2E - Criação de Hábitos

- [x] 2.1 [TDD-TEST] Criar testes E2E para criação de hábitos
  - **Arquivo**: `cypress/e2e/habits/create-habit.cy.ts`
  - **Casos de teste**:
    - `"deve criar um hábito diário com sucesso"`: Login → Click "Adicionar Hábito" → Preencher nome "Meditar" e descrição "10 minutos" → Recorrência "Diário" → Click "Criar" → Verificar toast + hábito na listagem
    - `"deve criar um hábito com dias específicos"`: Login → Click "Adicionar Hábito" → Nome "Correr" → Recorrência "Dias específicos" → Selecionar "Seg", "Qua", "Sex" → Click "Criar" → Verificar na listagem
    - `"deve criar um hábito com X vezes por semana"`: Login → Click "Adicionar Hábito" → Nome "Ler" → Recorrência "X vezes por semana" → Informar 4 → Click "Criar" → Verificar na listagem
    - `"deve exibir erro de validação quando nome está vazio"`: Login → Click "Adicionar Hábito" → Click "Criar" sem preencher → Verificar mensagem de erro no campo nome
    - `"deve impedir criação ao atingir limite de 3 hábitos no plano Free"`: Login → Criar 3 hábitos → Tentar criar 4º → Verificar mensagem de erro de limite

## 3. Testes E2E - Listagem e Busca de Hábitos

- [x] 3.1 [TDD-TEST] Criar testes E2E para listagem e busca de hábitos
  - **Arquivo**: `cypress/e2e/habits/read-habits.cy.ts`
  - **Casos de teste**:
    - `"deve exibir estado vazio quando não há hábitos"`: Login → Navegar para `/habits` → Verificar mensagem "Nenhum hábito cadastrado"
    - `"deve exibir hábitos criados na listagem"`: Login → Criar 2 hábitos → Navegar para `/habits` → Verificar que ambos aparecem com nome e recorrência
    - `"deve filtrar hábitos pela busca"`: Login → Criar hábitos "Meditar" e "Correr" → Digitar "Med" no campo de busca → Verificar que apenas "Meditar" aparece

## 4. Testes E2E - Edição de Hábitos

- [x] 4.1 [TDD-TEST] Criar testes E2E para edição de hábitos
  - **Arquivo**: `cypress/e2e/habits/update-habit.cy.ts`
  - **Casos de teste**:
    - `"deve editar o nome de um hábito"`: Login → Criar hábito "Meditar" → Abrir menu contexto → Click "Editar" → Limpar nome → Digitar "Meditar 15min" → Click "Atualizar" → Verificar toast + nome atualizado na listagem
    - `"deve editar o tipo de recorrência"`: Login → Criar hábito diário → Abrir edição → Trocar para "X vezes por semana" → Informar 3 → Click "Atualizar" → Verificar atualização

## 5. Testes E2E - Arquivamento de Hábitos

- [x] 5.1 [TDD-TEST] Criar testes E2E para arquivamento de hábitos
  - **Arquivo**: `cypress/e2e/habits/archive-habit.cy.ts`
  - **Casos de teste**:
    - `"deve arquivar um hábito com confirmação"`: Login → Criar hábito "Meditar" → Abrir menu contexto → Click "Arquivar" → Click "Arquivar" no dialog de confirmação → Verificar toast + hábito removido da listagem
    - `"deve cancelar o arquivamento"`: Login → Criar hábito "Meditar" → Abrir menu contexto → Click "Arquivar" → Click "Cancelar" no dialog → Verificar que hábito ainda está na listagem

## 6. Testes E2E - Toggle de Conclusão

- [ ] 6.1 [TDD-TEST] Criar testes E2E para toggle de conclusão de hábitos
  - **Arquivo**: `cypress/e2e/habits/toggle-completion.cy.ts`
  - **Casos de teste**:
    - `"deve marcar hábito como concluído"`: Login → Criar hábito → Click no toggle circular → Verificar estilização de concluído (verde com checkmark, texto com strikethrough)
    - `"deve desmarcar hábito concluído"`: Login → Criar hábito → Marcar como concluído → Click novamente no toggle → Verificar que voltou ao estado não-concluído

## 7. Testes E2E - Página de Detalhe

- [ ] 7.1 [TDD-TEST] Criar testes E2E para página de detalhe do hábito
  - **Arquivo**: `cypress/e2e/habits/habit-detail.cy.ts`
  - **Casos de teste**:
    - `"deve navegar para a página de detalhe do hábito"`: Login → Criar hábito "Meditar" → Click no nome do hábito → Verificar URL contém `/habits/` + id → Verificar título "Meditar" na página
    - `"deve voltar para a listagem de hábitos"`: Login → Criar hábito → Navegar para detalhe → Click no botão de voltar → Verificar URL é `/habits`

## 8. Validação de Qualidade

- [ ] 8.1 [QUALITY] Rodar lint em todos os arquivos de teste Cypress
  - **Comando**: `pnpm eslint cypress/`
  - **Critério**: Zero erros de ESLint

- [ ] 8.2 [QUALITY] Rodar typecheck nos arquivos de teste
  - **Comando**: `pnpm tsc --noEmit`
  - **Critério**: Zero erros de TypeScript

- [ ] 8.3 [QUALITY] Executar suite completa de testes Cypress
  - **Comando**: `npx cypress run --spec "cypress/e2e/habits/**/*.cy.ts"`
  - **Critério**: Todos os testes passam sem flaky tests, zero falsos positivos
  - **Pré-requisitos**: Aplicação Next.js rodando (`pnpm dev`), banco de teste disponível
