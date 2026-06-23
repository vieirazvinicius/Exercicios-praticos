# API de Alunos com Node.js e Express

Este projeto é uma API simples para cadastrar alunos e listar alunos usando **Node.js**, **Express** e **dotenv**.

A aplicação está toda concentrada no arquivo [`src/index.js`](src/index.js). Por isso, este README explica o projeto acompanhando exatamente o que foi feito nesse arquivo, passo por passo, de um jeito bem mastigado para quem está começando em programação.

## O Que Essa Aplicação Faz

Esta API permite:

- Cadastrar um aluno.
- Listar todos os alunos cadastrados.
- Buscar um aluno pela matrícula.

O aluno cadastrado possui três informações:

```json
{
  "matricula": "a92222",
  "nome": "Maria Silva",
  "email": "maria@email.com"
}
```

Neste projeto, os alunos ficam guardados em um array chamado `alunos`.

No arquivo `src/index.js`, ele aparece assim:

```js
const alunos = [];
```

Isso significa que os dados ficam salvos apenas na memória do servidor. Se você parar o servidor e iniciar de novo, a lista de alunos volta a ficar vazia.

Este projeto ainda não usa banco de dados.

## Tecnologias Usadas

### Node.js

O Node.js permite rodar JavaScript fora do navegador.

Neste projeto, ele é usado para criar um servidor backend.

### Express

O Express é uma biblioteca do Node.js que facilita a criação de APIs.

Com ele, criamos rotas como:

```js
app.get("/listar", ...)
app.get("/listar/:matricula", ...)
app.post("/cadastrar", ...)
```

### dotenv

O dotenv permite usar variáveis de ambiente dentro do projeto.

Neste projeto, ele é usado para pegar a porta do servidor a partir do arquivo `.env`.

No código:

```js
dotenv.config();
```

E depois:

```js
const porta = process.env.PORTA;
```

## Estrutura Do Projeto

```text
aluno/
├── src/
│   └── index.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### `src/index.js`

É o arquivo principal da aplicação.

Nele estão:

- A importação do Express.
- A importação do dotenv.
- A configuração para receber JSON.
- A criação do array de alunos.
- As rotas da API.
- O comando que inicia o servidor.

### `.env`

É o arquivo onde fica a porta do servidor.

Exemplo:

```env
PORTA=3000
```

### `.env.example`

É um arquivo de exemplo para mostrar qual variável precisa existir no `.env`.

Hoje ele indica que você deve adicionar uma porta.

Um exemplo correto seria:

```env
PORTA=3000
```

### `package.json`

É o arquivo de configuração do projeto Node.js.

Nele estão as dependências e os scripts.

O script principal do projeto é:

```json
"start": "node --watch src/index.js"
```

Isso significa que, ao rodar:

```bash
npm start
```

O Node executa o arquivo `src/index.js`.

O `--watch` faz o Node observar alterações no código e reiniciar o servidor automaticamente quando você salvar mudanças.

## Como Rodar O Projeto

### 1. Abrir O Terminal Na Pasta Do Projeto

Entre na pasta:

```powershell
cd C:\Users\i3831\Desktop\aluno
```

### 2. Instalar As Dependências

Rode:

```bash
npm install
```

Esse comando instala as bibliotecas usadas no projeto:

- `express`
- `dotenv`

### 3. Configurar A Porta

Abra o arquivo `.env` e deixe assim:

```env
PORTA=3000
```

Você pode escolher outra porta, mas nos exemplos deste README será usada a porta `3000`.

### 4. Iniciar O Servidor

Rode:

```bash
npm start
```

Se tudo estiver certo, aparecerá no terminal:

```text
O servidor está em execução!
```

A API ficará disponível em:

```text
http://localhost:3000
```

## Explicando O Código Do `src/index.js`

Agora vamos passar pelo arquivo principal da aplicação.

## Importação Das Bibliotecas

No começo do arquivo temos:

```js
import express from "express";
import dotenv from "dotenv";
```

Aqui estamos trazendo duas bibliotecas para dentro do projeto.

### `express`

É usado para criar o servidor e as rotas.

### `dotenv`

É usado para ler as informações do arquivo `.env`.

Como o `package.json` tem:

```json
"type": "module"
```

podemos usar `import` em vez de `require`.

## Carregando O Arquivo `.env`

Depois temos:

```js
dotenv.config();
```

Essa linha manda o dotenv carregar as variáveis que estão no arquivo `.env`.

Sem essa linha, o código abaixo poderia não conseguir ler a porta:

```js
process.env.PORTA
```

## Criando A Aplicação Express

```js
const app = express();
```

Aqui criamos a aplicação Express.

A variável `app` representa o servidor da API.

Ela é usada para:

- Configurar comportamentos da aplicação.
- Criar rotas.
- Iniciar o servidor.

## Permitindo Que A API Receba JSON

```js
app.use(express.json());
```

Essa linha é muito importante.

Ela permite que a API consiga entender dados enviados em formato JSON no corpo da requisição.

Por exemplo, quando enviamos:

```json
{
  "matricula": "a92222",
  "nome": "Maria Silva",
  "email": "maria@email.com"
}
```

o Express consegue transformar esse JSON em um objeto acessível por:

```js
requisicao.body
```

Sem `app.use(express.json())`, o cadastro poderia não receber os dados corretamente.

## Pegando A Porta Do Servidor

```js
const porta = process.env.PORTA;
```

Essa linha pega a porta configurada no arquivo `.env`.

Se o `.env` estiver assim:

```env
PORTA=3000
```

então a variável `porta` terá o valor `3000`.

## Criando A Lista De Alunos

```js
const alunos = [];
```

Aqui foi criado um array vazio.

Um array é uma lista.

Neste projeto, essa lista guarda todos os alunos cadastrados.

Depois de cadastrar um aluno, ela pode ficar assim:

```js
[
  {
    matricula: "a92222",
    nome: "Maria Silva",
    email: "maria@email.com"
  }
]
```

Como essa lista está dentro do código e não em um banco de dados, ela existe somente enquanto o servidor está rodando.

## Rota Para Listar Todos Os Alunos

No código:

```js
app.get("/listar", (requisicao, resposta) => {
  try {
    if (alunos.length === 0) {
      return resposta.status(200).json({ mensagem: "Nenhum aluno cadastrado!" });
    }
    resposta.status(200).json(alunos);
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao listar os alunos", erro: error });
  }
});
```

Essa rota usa o método `GET`.

O `GET` é usado quando queremos buscar informações.

A rota completa é:

```text
GET http://localhost:3000/listar
```

### O Que Essa Rota Faz

Ela verifica se existem alunos cadastrados.

Essa parte faz a verificação:

```js
if (alunos.length === 0) {
  return resposta.status(200).json({ mensagem: "Nenhum aluno cadastrado!" });
}
```

`alunos.length` mostra quantos itens existem dentro do array.

Se o tamanho for `0`, significa que não existe nenhum aluno cadastrado.

Nesse caso, a API responde:

```json
{
  "mensagem": "Nenhum aluno cadastrado!"
}
```

Se já existirem alunos, essa linha é executada:

```js
resposta.status(200).json(alunos);
```

Ela retorna a lista completa de alunos.

## Rota Para Buscar Aluno Pela Matrícula

No código:

```js
app.get("/listar/:matricula", (requisicao, resposta) => {
  try {
    const matricula = requisicao.params.matricula;
    const aluno_procurado = alunos.find(aluno => aluno.matricula === matricula);

    if (!aluno_procurado) {
      return resposta.status(200).json({ mensagem: "Aluno não encontrado!" });
    }

    resposta.status(200).json(aluno_procurado);
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao listar o aluno", erro: error });
  }
});
```

Essa rota também usa `GET`, porque ela busca informação.

A rota é:

```text
GET http://localhost:3000/listar/a92222
```

O trecho `:matricula` é um parâmetro da rota.

Isso significa que esse valor muda dependendo da matrícula que você quer buscar.

Exemplo:

```text
/listar/a92222
```

Nesse caso, a matrícula é:

```text
a92222
```

O código pega esse valor aqui:

```js
const matricula = requisicao.params.matricula;
```

Depois procura dentro do array:

```js
const aluno_procurado = alunos.find(aluno => aluno.matricula === matricula);
```

O método `.find()` percorre a lista de alunos e procura o primeiro aluno cuja matrícula seja igual à matrícula enviada na URL.

Se não encontrar, cai nesse trecho:

```js
if (!aluno_procurado) {
  return resposta.status(200).json({ mensagem: "Aluno não encontrado!" });
}
```

Se encontrar, retorna o aluno:

```js
resposta.status(200).json(aluno_procurado);
```

## Rota Para Cadastrar Aluno

No código:

```js
app.post("/cadastrar", (requisicao, resposta) => {
  try {
    const { matricula, nome, email } = requisicao.body;
    const dados = { matricula, nome, email };

    if (!matricula || !nome || !email) {
      return resposta.status(400).json({ mensagem: "Todos os campos são obrigatorios!" });
    }

    alunos.push(dados);

    resposta.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao cadastrar usuario!", erro: error });
  }
});
```

Essa rota usa o método `POST`.

O `POST` é usado quando queremos enviar dados para criar alguma coisa.

A rota completa é:

```text
POST http://localhost:3000/cadastrar
```

## Corpo Da Requisição

Para cadastrar um aluno, você precisa enviar um JSON no corpo da requisição:

```json
{
  "matricula": "a92222",
  "nome": "Maria Silva",
  "email": "maria@email.com"
}
```

O código pega esses dados aqui:

```js
const { matricula, nome, email } = requisicao.body;
```

Isso se chama desestruturação.

É como se o código estivesse dizendo:

- Pegue a `matricula` que veio no corpo da requisição.
- Pegue o `nome` que veio no corpo da requisição.
- Pegue o `email` que veio no corpo da requisição.

Depois, o código monta um objeto:

```js
const dados = { matricula, nome, email };
```

Esse objeto representa o aluno que será salvo.

## Validação Dos Campos

Antes de salvar, o código verifica se todos os campos foram enviados:

```js
if (!matricula || !nome || !email) {
  return resposta.status(400).json({ mensagem: "Todos os campos são obrigatorios!" });
}
```

Esse trecho significa:

- Se não tiver matrícula, retorna erro.
- Se não tiver nome, retorna erro.
- Se não tiver e-mail, retorna erro.

O status `400` significa que o cliente enviou uma requisição errada ou incompleta.

Resposta nesse caso:

```json
{
  "mensagem": "Todos os campos são obrigatorios!"
}
```

## Salvando O Aluno

Se todos os campos foram enviados, o aluno é salvo aqui:

```js
alunos.push(dados);
```

O `.push()` adiciona um novo item no final do array.

Ou seja, ele coloca o aluno dentro da lista `alunos`.

Depois disso, a API responde:

```js
resposta.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });
```

O status `201` significa que algo foi criado com sucesso.

## Iniciando O Servidor

No final do arquivo:

```js
app.listen(porta, () => {
  console.log(`O servidor está em execução!`);
});
```

Essa parte inicia o servidor.

O Express começa a escutar requisições na porta configurada.

Se a porta for `3000`, o servidor ficará em:

```text
http://localhost:3000
```

## Rotas Da API

| Método | Rota | O Que Faz |
| --- | --- | --- |
| `GET` | `/listar` | Lista todos os alunos |
| `GET` | `/listar/:matricula` | Busca um aluno pela matrícula |
| `POST` | `/cadastrar` | Cadastra um aluno |

## Como Testar A API

Você pode testar usando:

- Postman.
- Insomnia.
- Thunder Client no VS Code.
- Navegador, apenas para rotas `GET`.
- Terminal.

## Testando Pelo Navegador

O navegador consegue acessar rotas `GET`.

Para listar todos:

```text
http://localhost:3000/listar
```

Para buscar por matrícula:

```text
http://localhost:3000/listar/a92222
```

Para cadastrar aluno, use Postman, Insomnia, Thunder Client ou terminal, porque cadastro usa `POST`.

## Testando Com PowerShell

### Cadastrar Um Aluno

```powershell
Invoke-RestMethod -Method Post `
  -Uri "http://localhost:3000/cadastrar" `
  -ContentType "application/json" `
  -Body '{"matricula":"a92222","nome":"Maria Silva","email":"maria@email.com"}'
```

Resposta esperada:

```json
{
  "mensagem": "Cadastro realizado com sucesso!"
}
```

### Listar Todos Os Alunos

```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:3000/listar"
```

### Buscar Um Aluno Pela Matrícula

```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:3000/listar/a92222"
```

## Testando Com Postman Ou Insomnia

### Cadastrar Aluno

Configuração:

- Método: `POST`
- URL: `http://localhost:3000/cadastrar`
- Body: `raw`
- Formato: `JSON`

Corpo:

```json
{
  "matricula": "a92222",
  "nome": "Maria Silva",
  "email": "maria@email.com"
}
```

### Listar Alunos

Configuração:

- Método: `GET`
- URL: `http://localhost:3000/listar`

### Buscar Por Matrícula

Configuração:

- Método: `GET`
- URL: `http://localhost:3000/listar/a92222`

## Status HTTP Usados

| Status | Onde Aparece | Significado |
| --- | --- | --- |
| `200` | Listagem e busca | A requisição deu certo |
| `201` | Cadastro | O aluno foi criado com sucesso |
| `400` | Cadastro com dados faltando | A requisição veio incompleta |
| `500` | Bloco `catch` | Erro interno no servidor |

## Sobre O `try/catch`

As rotas usam `try/catch`.

Exemplo:

```js
try {
  // tenta executar o código
} catch (error) {
  // se der erro, cai aqui
}
```

O `try` tenta executar o código principal.

O `catch` captura algum erro inesperado e devolve uma resposta com status `500`.

Isso evita que a aplicação simplesmente quebre sem responder nada.

## Pontos Importantes Para Iniciantes

### `requisicao`

Representa o pedido que chegou na API.

É dela que pegamos:

- Parâmetros da rota: `requisicao.params`
- Corpo da requisição: `requisicao.body`

### `resposta`

Representa a resposta que a API vai devolver.

Exemplo:

```js
resposta.status(200).json(alunos);
```

Isso significa:

- Responder com status `200`.
- Enviar os dados em formato JSON.

### `return`

Em alguns pontos aparece:

```js
return resposta.status(200).json(...)
```

Esse `return` faz a função parar ali.

Ele evita que o restante da rota continue executando depois que a resposta já foi enviada.

## Erros Comuns

### Esquecer De Rodar `npm install`

Se aparecer erro dizendo que não encontrou `express` ou `dotenv`, rode:

```bash
npm install
```

### Esquecer De Configurar O `.env`

Confira se o arquivo `.env` existe e se está assim:

```env
PORTA=3000
```

### Enviar JSON Errado No Cadastro

O cadastro precisa receber exatamente:

```json
{
  "matricula": "a92222",
  "nome": "Maria Silva",
  "email": "maria@email.com"
}
```

Se faltar algum campo, a API retorna erro `400`.

### Os Dados Sumiram

Isso acontece porque os alunos ficam apenas no array em memória.

Quando o servidor reinicia, o array volta a ficar vazio:

```js
const alunos = [];
```

Para os dados ficarem salvos de verdade, seria necessário usar um banco de dados.

### Porta Já Está Em Uso

Se aparecer erro dizendo que a porta já está em uso, troque a porta no `.env`.

Exemplo:

```env
PORTA=3333
```

Depois reinicie o servidor.

## Melhorias Que Podem Ser Feitas Depois

Este projeto é simples, mas pode evoluir.

Algumas melhorias possíveis:

- Não permitir duas matrículas iguais.
- Criar uma rota para atualizar aluno.
- Criar uma rota para deletar aluno.
- Validar se o e-mail tem formato válido.
- Salvar os alunos em banco de dados.
- Separar as rotas em arquivos diferentes.
- Criar controllers.
- Criar services.
- Criar testes automatizados.

## Resumo Final

Para rodar:

```bash
npm install
npm start
```

Configure o `.env`:

```env
PORTA=3000
```

Rotas:

```text
GET  /listar
GET  /listar/:matricula
POST /cadastrar
```

Exemplo de cadastro:

```json
{
  "matricula": "a92222",
  "nome": "Maria Silva",
  "email": "maria@email.com"
}
```

Essa aplicação é uma base inicial para entender como uma API funciona: ela recebe requisições, processa dados e devolve respostas em JSON.
