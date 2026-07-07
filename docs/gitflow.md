# Git Flow

Este documento define o fluxo de trabalho utilizando Git adotado pelo projeto. O objetivo é manter um histórico organizado, facilitar revisões de código e garantir um processo de desenvolvimento previsível.

---

# Fluxo de Branches

## `main`

A branch `main` representa o código em produção.

Regras:

- Deve conter apenas versões estáveis.
- Não realizar commits diretamente.
- Alterações devem chegar apenas através de Pull Request.

---

## `develop`

A branch `develop` concentra todas as funcionalidades que estão em desenvolvimento.

Regras:

- É a base para criação de novas funcionalidades.
- Recebe merge das branches `feature/*`.
- Não realizar commits diretamente.

---

## Branches de Feature

Utilizadas para desenvolvimento de novas funcionalidades.

**Padrão:**

```text
feature/nome-da-feature
```

**Exemplos:**

```text
feature/login
feature/create-user
feature/payment-gateway
feature/email-notification
```

Fluxo:

1. Criar a branch a partir da `develop`.
2. Desenvolver a funcionalidade.
3. Abrir um Pull Request para `develop`.
4. Após aprovação, realizar o merge.

---

## Branches de Bugfix

Utilizadas para correções durante o desenvolvimento.

**Padrão:**

```text
bugfix/descricao-do-bug
```

**Exemplos:**

```text
bugfix/login-validation
bugfix/token-expiration
bugfix/order-calculation
```

Fluxo:

1. Criar a branch a partir da `develop`.
2. Corrigir o problema.
3. Abrir Pull Request para `develop`.

---

## Branches de Hotfix

Utilizadas para correções urgentes em produção.

**Padrão:**

```text
hotfix/descricao-do-problema
```

**Exemplos:**

```text
hotfix/security-patch
hotfix/payment-error
hotfix/api-timeout
```

Fluxo:

1. Criar a branch a partir da `main`.
2. Corrigir o problema.
3. Abrir Pull Request para `main`.
4. Após o merge, sincronizar a alteração na `develop`.

---

## Branches de Release

Utilizadas para preparar uma nova versão para produção.

**Padrão:**

```text
release/v1.0.0
```

**Exemplos:**

```text
release/v1.0.0
release/v1.1.0
release/v2.0.0
```

Fluxo:

1. Criar a branch a partir da `develop`.
2. Executar testes e ajustes finais.
3. Abrir Pull Request para `main`.
4. Criar a tag da versão.
5. Fazer merge da `release` de volta para `develop`.

---

# Commits

Utilize o padrão **Conventional Commits**.

## Tipos

| Tipo | Descrição |
|-------|-----------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Alteração de documentação |
| `style` | Alterações de formatação |
| `refactor` | Refatoração sem alteração de comportamento |
| `perf` | Melhoria de performance |
| `test` | Criação ou alteração de testes |
| `build` | Alterações relacionadas ao build |
| `ci` | Configuração de CI/CD |
| `chore` | Tarefas de manutenção |
| `revert` | Reversão de commits |

---

## Exemplos

```text
feat(auth): add login endpoint

fix(api): correct validation middleware

docs: update README

refactor(user): simplify service layer

test(auth): add login tests

chore: update dependencies
```

---

# Pull Requests

Todo Pull Request deve:

- Possuir um título claro.
- Ter uma descrição objetiva.
- Referenciar a issue correspondente (quando existir).
- Passar em todos os testes automatizados.
- Receber aprovação antes do merge.

---

# Merge

Utilize preferencialmente **Squash Merge**.

Benefícios:

- Histórico limpo.
- Um commit por funcionalidade.
- Facilita auditorias e rollback.

---

# Versionamento

O projeto utiliza **Semantic Versioning (SemVer)**.

Formato:

```text
MAJOR.MINOR.PATCH
```

Exemplos:

```text
1.0.0
1.2.0
1.2.5
2.0.0
```

### MAJOR

Alterações incompatíveis com versões anteriores.

### MINOR

Novas funcionalidades compatíveis.

### PATCH

Correções de bugs sem quebra de compatibilidade.

---

# Boas Práticas

- Nunca faça commit diretamente em `main`.
- Nunca faça commit diretamente em `develop`.
- Mantenha as branches pequenas e objetivas.
- Faça commits frequentes e com mensagens claras.
- Atualize sua branch antes de abrir um Pull Request.
- Resolva conflitos antes da revisão.
- Exclua branches após o merge.

---

# Resumo

| Branch | Origem | Destino |
|---------|---------|---------|
| `feature/*` | `develop` | `develop` |
| `bugfix/*` | `develop` | `develop` |
| `release/*` | `develop` | `main` + `develop` |
| `hotfix/*` | `main` | `main` + `develop` |

---

# Fluxo Resumido

```text
main
 │
 ├───────────────┐
 │               │
 ▼               │
develop          │
 │               │
 ├── feature/* ──┤
 ├── bugfix/* ───┤
 │               │
 ├── release/* ──► main
 │               │
 └───────────────┘

main
 └── hotfix/* ──► main
          │
          └────────► develop
```