# Convenções de Código

Este documento define os padrões de nomenclatura adotados no projeto. O objetivo é manter o código consistente, legível e de fácil manutenção.

---

# Convenções de Nomenclatura

## Variáveis de Ambiente

Utilize **UPPER_SNAKE_CASE** (todas as letras maiúsculas com `_` separando as palavras).

**Exemplos:**

```text
DATABASE_URL
API_KEY
JWT_SECRET
REDIS_HOST
NODE_ENV
```

---

## Variáveis Globais

Utilize **camelCase**.

Essas variáveis devem ser usadas apenas quando realmente necessário.

**Exemplos:**

```ts
appConfig
databaseConnection
httpClient
cacheManager
currentUser
```

---

## Variáveis Locais

Utilize **camelCase**.

Os nomes devem ser claros e representar o propósito da variável.

**Exemplos:**

```ts
user
userName
totalPrice
createdAt
isActive
```

---

## Constantes

Utilize **UPPER_SNAKE_CASE** apenas para constantes de negócio ou valores imutáveis globais.

Para constantes locais, prefira **camelCase**.

### Constantes Globais

```ts
MAX_RETRY_COUNT
DEFAULT_TIMEOUT
HTTP_STATUS_OK
```

### Constantes Locais

```ts
const maxItems = 10;
const timeout = 5000;
```

---

## Funções

Utilize **camelCase**.

Prefira nomes iniciando por verbos que indiquem claramente a ação executada.

**Exemplos:**

```ts
getUser()
createOrder()
calculateTotal()
validateToken()
sendEmail()
```

---

## Classes

Utilize **PascalCase**.

Os nomes devem representar entidades ou objetos.

**Exemplos:**

```ts
UserService
PaymentGateway
EmailProvider
OrderController
```

---

## Interfaces

Utilize **PascalCase**.

Não utilize prefixos como `I`.

**Exemplos:**

```ts
User
CreateUserRequest
PaymentResponse
DatabaseConfig
```

---

## Types

Utilize **PascalCase**.

**Exemplos:**

```ts
UserRole
OrderStatus
ApiResponse
```

---

## Enums

Utilize **PascalCase** para o nome do enum e **UPPER_SNAKE_CASE** para seus valores.

**Exemplo:**

```ts
enum OrderStatus {
  PENDING,
  PROCESSING,
  COMPLETED,
  CANCELED,
}
```

---

## Arquivos

Utilize **kebab-case**.

**Exemplos:**

```text
user-service.ts
payment-provider.ts
database-config.ts
create-user.use-case.ts
```

---

## Diretórios

Utilize **kebab-case**.

**Exemplos:**

```text
user
auth
payment
shared
database
```

---

## Componentes (React)

Utilize **PascalCase**.

**Exemplos:**

```text
UserCard.tsx
LoginForm.tsx
Header.tsx
Sidebar.tsx
```

---

## Hooks (React)

Utilize o prefixo `use` seguido de **PascalCase**.

**Exemplos:**

```ts
useAuth()
useTheme()
useUser()
useDebounce()
```

---

## Booleanos

Sempre utilize nomes que expressem uma condição.

Prefira prefixos como:

- `is`
- `has`
- `can`
- `should`

**Exemplos:**

```ts
isAdmin
isLoading
hasPermission
canEdit
shouldRetry
```

---

## Convenções Gerais

- Utilize nomes descritivos.
- Evite abreviações desnecessárias.
- Evite nomes genéricos como `data`, `temp`, `obj`, `item`, `value`.
- Prefira consistência em vez de criatividade.
- Mantenha o mesmo padrão em todo o projeto.

---

# Resumo

| Elemento | Convenção |
|----------|-----------|
| Variáveis de ambiente | `UPPER_SNAKE_CASE` |
| Variáveis globais | `camelCase` |
| Variáveis locais | `camelCase` |
| Constantes globais | `UPPER_SNAKE_CASE` |
| Constantes locais | `camelCase` |
| Funções | `camelCase` |
| Classes | `PascalCase` |
| Interfaces | `PascalCase` |
| Types | `PascalCase` |
| Enums | `PascalCase` |
| Valores de Enum | `UPPER_SNAKE_CASE` |
| Componentes React | `PascalCase` |
| Hooks | `use` + `PascalCase` |
| Arquivos | `kebab-case` |
| Diretórios | `kebab-case` |
| Booleanos | `is`, `has`, `can`, `should` + `camelCase` |