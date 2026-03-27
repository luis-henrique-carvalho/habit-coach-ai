## Context

O sistema utiliza o Better Auth para gerenciamento de sessões. Atualmente, os formulários de autenticação utilizam tanto a propriedade `callbackURL` quanto o callback `onSuccess` para redirecionar o usuário para o dashboard. Isso causa instabilidade no roteamento do Next.js. Além disso, o middleware é muito sensível à presença do cookie de sessão, o que pode causar redirecionamentos antes que o frontend processe erros.

## Goals / Non-Goals

**Goals:**
- Unificar o fluxo de redirecionamento pós-autenticação.
- Corrigir o tratamento de erros nos formulários.
- Melhorar a confiabilidade do middleware.

**Non-Goals:**
- Implementar novas funcionalidades de autenticação (como MFA).
- Alterar o design visual das telas de login/registro.

## Decisions

### 1. Unificação de Redirecionamento
Removeremos o `router.push("/dashboard")` dos callbacks `onSuccess`.
- **Racional**: O Better Auth já lida com o redirecionamento quando o `callbackURL` é fornecido. O uso simultâneo do `router.push` causa uma segunda tentativa de navegação que pode falhar ou causar flashes na interface.

### 2. Ajuste no Middleware
Modificaremos o middleware para ser mais robusto na verificação de cookies.
- **Racional**: Além de `better-auth.session_token`, o middleware deve estar preparado para cookies com prefixo `__Secure-` ou `__Host-` em produção.

### 3. Tratamento de Erros nos Formulários
Garantiremos que o estado de erro do formulário seja limpo no início da submissão e que o `callbackURL` só seja acionado em fluxos de sucesso completo.

## Risks / Trade-offs

- **[Risco]** Se o Better Auth falhar no redirecionamento automático, o usuário pode ficar "preso" na tela de login. → **Mitigação**: Manteremos um log básico ou usaremos o callback `onSuccess` apenas como fallback se necessário, mas a prioridade é o `callbackURL`.

## Test Plan

1. **Teste de Login com Sucesso**:
   - Inserir credenciais válidas.
   - Verificar se o redirecionamento para `/dashboard` ocorre de forma fluida.
2. **Teste de Registro com Sucesso**:
   - Inserir dados de novo usuário.
   - Verificar se o redirecionamento ocorre apenas após a criação bem-sucedida.
3. **Teste de Falha na Autenticação**:
   - Inserir credenciais inválidas.
   - Verificar se a mensagem de erro aparece e o redirecionamento **NÃO** ocorre.
4. **Teste de Acesso Direto a Rota Protegida**:
   - Tentar acessar `/dashboard` deslogado.
   - Verificar se redireciona para `/login?next=/dashboard`.
