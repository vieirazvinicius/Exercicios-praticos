import express from "express";
import dotenv from "dotenv";
import router from "./modules/veiculo/routes/veiculo.route.js";

dotenv.config();

const app = express();

// Usar aplicação como json
app.use(express.json());

//Registrando as rotas do módulo veículo
app.use(router)

const porta = process.env.PORTA;

const veiculos = [];

// Verificar a saúde da API
app.get("/", (requisicao, resposta) => {
  try {
    resposta.status(200).json({mensagem: "API funcionando com sucesso!", 
    status: "ok", 
    date: Date().toLocaleString("pt-BR", { timeZone: "America/Recife"}) })
  } catch (error) {
    resposta
      .status(500)
      .json({ mensagem: "Erro da API", erro: error.message });
  }
})

app.listen(porta, () => {
  console.log(`O servidor está em execução!`);
});

