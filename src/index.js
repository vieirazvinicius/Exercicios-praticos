import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const porta = process.env.PORTA;

const alunos = [
  {
    matricula: "a92222",
    nome: "João",
    email: "joao@gmail.com",
  },
  {
    matricula: "a93333",
    nome: "José",
    email: "jose@gmail.com",
  },
  {
    matricula: "a94444",
    nome: "Maria",
    email: "maria@gmail.com",
  },
];

app.get("/listar", (requisicao, resposta) => {
  try {
    if (alunos.length === 0) {
      return resposta
        .status(200)
        .json({ mensagem: "Nenhum aluno cadastrado!" });
    }
    resposta.status(200).json(alunos);
  } catch (error) {
    resposta
      .status(500)
      .json({ mensagem: "Erro ao listar os alunos", erro: error });
  }
});

// Endpoint para listar aluno pelo matricula
// http://localhost:3000/listar/a92222
app.get("/listar/:matricula", (requisicao, resposta) => {
  try {
    const matricula = requisicao.params.matricula;
    // const alunos = [{},{},{}]
    const aluno = alunos.find(aluno => aluno.matricula === matricula);

    // e se o aluno que eu estou procurando não existir?
    if(!aluno){
        return resposta.status(200).json({mensagem: "Aluno não encontrado!"})
    }

    resposta.status(200).json(aluno)
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao listar o aluno", erro: error})
  }
});

app.listen(porta, () => {
  console.log(`O servidor está em execução!`);
});
