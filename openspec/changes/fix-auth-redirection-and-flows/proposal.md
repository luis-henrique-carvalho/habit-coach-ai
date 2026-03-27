## Why

A autenticação está apresentando problemas nos fluxos de redirecionamento e tratamento de erros. Usuários relataram serem redirecionados para o dashboard mesmo após erros na criação de conta, além de redundância nas chamadas de redirecionamento (Better Auth callbackURL + router.push manual). Isso prejudica a experiência do usuário e a robustez do sistema de segurança.

## What Changes

- **Limpeza de Redirecionamentos**: Remover chamadas manuais `router.push("/dashboard")` nos callbacks `onSuccess` dos formulários de login e cadastro, confiando apenas no `callbackURL` do Better Auth para evitar conflitos e comportamentos inesperados.
- **Tratamento de Erros Robusto**: Garantir que o `callbackURL` seja processado apenas em caso de sucesso real e que erros sejam exibidos corretamente sem acionar redirecionamentos prematuros.
- **Melhoria no Middleware**: Atualizar a lógica do middleware para ser mais precisa na verificação de cookies de sessão, considerando prefixos comuns e evitando redirecionamentos em loops ou baseados em cookies parciais.
- **Consistência Visual**: Garantir que as mensagens de erro permaneçam visíveis tempo suficiente para o usuário ler, caso ocorra algum problema.

## Capabilities

### Modified Capabilities
- `habit-management`: (Indireto) O fluxo de acesso aos hábitos depende de uma autenticação sólida.

## Impact

- **Frontend**: Alterações nos componentes `src/app/(public)/(auth)/components/sign-in-form.tsx` e `src/app/(public)/(auth)/components/sign-up-form.tsx`.
- **Segurança**: Ajustes no `src/middleware.ts` para proteção de rotas privadas e redirecionamento de usuários logados.
- **UX**: Melhor feedback em caso de falha na autenticação.
