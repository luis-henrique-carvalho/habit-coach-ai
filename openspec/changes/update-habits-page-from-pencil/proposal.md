## Why

A atualização da página de hábitos é necessária para alinhar a interface com a nova proposta de design do Habit Coach AI, proporcionando uma experiência de usuário mais moderna, intuitiva e funcional. O novo design melhora a visualização da lista de hábitos, facilita o filtro por status (Pendente/Concluído) e otimiza a busca, resultando em maior engajamento do usuário.

## What Changes

- **Redesenho da Página de Hábitos**: Implementação do novo layout para desktop e mobile conforme definido no `pencil-new.pen`.
- **Sistema de Filtros**: Adição de abas para filtrar hábitos por "Todos", "Pendentes" e "Concluídos".
- **Busca Integrada**: Atualização da barra de busca para se integrar visualmente aos novos filtros.
- **Novos Cards de Hábito**: Reformulação visual dos cards de hábito, incluindo indicadores de status mais claros e melhor aproveitamento de espaço.
- **Responsividade Mobile**: Implementação da visualização mobile com barra superior de contexto, lista otimizada e navegação inferior.
- **Consistência de Layout**: Ajuste do container principal para refletir o novo padrão de padding e gaps do design.

## Capabilities

### New Capabilities
- N/A

### Modified Capabilities
- `habit-management`: Inclusão de requisitos para filtragem por status (Pendente/Concluído) na listagem principal.

## Impact

- **Frontend**: Alterações em `src/app/(private)/habits/page.tsx` e `src/app/(private)/habits/components/habits-content.tsx`.
- **Componentes UI**: Criação ou atualização de componentes de card de hábito e filtros.
- **Navegação**: Ajustes na estrutura de containers da área logada para suportar o novo layout.
