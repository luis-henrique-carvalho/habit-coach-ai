## 1. Ajustes nos Formulários de Autenticação

- [x] 1.1 Refatorar `src/app/(public)/(auth)/components/sign-in-form.tsx`: Remover `router.push` do `onSuccess` e manter apenas `callbackURL`.
- [x] 1.2 Refatorar `src/app/(public)/(auth)/components/sign-up-form.tsx`: Remover `router.push` do `onSuccess` e manter apenas `callbackURL`.
- [x] 1.3 Revisar `src/app/(public)/(auth)/components/o-auth-buttons.tsx`: Garantir que o `callbackURL` esteja correto.

## 2. Refatoração do Middleware

- [x] 2.1 Atualizar `src/middleware.ts` para usar uma detecção de cookie mais robusta (suporte a prefixos `__Secure-` e `__Host-`).
- [x] 2.2 Adicionar log ou comentário explicativo sobre a estratégia de proteção de rotas.

## 3. Validação e Qualidade

- [x] 3.1 Executar `npm run build` para garantir que as mudanças não quebraram o build do Next.js.
- [x] 3.2 Rodar `npx eslint src/app/(public)/(auth) src/middleware.ts` para validar padrões de código.
- [x] 3.3 (Opcional) Criar um teste E2E básico para o fluxo de login se houver suporte no projeto.
