import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const porta = process.env.PORTA;

const alunos = [];

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

// Endpoint para listar aluno pelo matricula
// http://localhost:3000/listar/a92222
app.get("/listar/:matricula", (requisicao, resposta) => {
  try {
    const matricula = requisicao.params.matricula;
    // const alunos = [{},{},{}]
    const aluno_procurado = alunos.find(aluno => aluno.matricula === matricula);

    // e se o aluno que eu estou procurando não existir?
    if(!aluno_procurado){
        return resposta.status(200).json({mensagem: "Aluno não encontrado!"})
    }

    resposta.status(200).json(aluno_procurado)
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao listar o aluno", erro: error})
  }
});

// Endpoint para cadastrar um aluno 
app.post("/cadastrar", (requisicao, resposta) => {
  try {
    // corpo da requisição com os dados que preciso
    const { matricula, nome, email } = requisicao.body
    // Vericando se todos os campos foram preenchidos, caso não retorna erro 400
    if(!matricula || !nome || !email){
      return resposta.status(400).json({mensagem:"Todos os campos são obrigatorios!"})
    }
    // salvando os dados que enviei ao servidor pela req
    const dados = { matricula, nome, email }
    // Salvando os dados em array(memoria) via push
    const aluno = alunos.push(dados)

    // resposta informando que o aluno foi cadastrado
    resposta.status(201).json({mensagem: "Cadastro realizado com sucesso!" , aluno: aluno})
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao cadastrar usuario!"})
  }
})



app.listen(porta, () => {
  console.log(`O servidor está em execução!`);
});
