import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Usar aplicação como json
app.use(express.json());

const porta = process.env.PORTA;

const veiculos = [];

app.get("/listar", (requisicao, resposta) => {
  try {
    if (veiculos.length === 0) {
      return resposta
        .status(200)
        .json({ mensagem: "Nenhum veículo cadastrado!" });
    }
    resposta.status(200).json(veiculos);
  } catch (error) {
    resposta
      .status(500)
      .json({ mensagem: "Erro ao listar os veículos", erro: error });
  }
});

// Endpoint para listar veiculo pelo placa
// http://localhost:3000/listar/a92222
app.get("/listar/:placa", (requisicao, resposta) => {
  try {
    const placa = requisicao.params.placa;
    // const veiculo = [{},{},{}]
    const veiculo_procurado = veiculos.find(
      (veiculo) => veiculo.placa === placa,
    );

    // e se o veiculo que eu estou procurando não existir?
    if (!veiculo_procurado) {
      return resposta.status(200).json({ mensagem: "Veículo não encontrado!" });
    }

    resposta.status(200).json(veiculo_procurado);
  } catch (error) {
    resposta
      .status(500)
      .json({ mensagem: "Erro ao listar o veículo", erro: error });
  }
});

// Endpoint para cadastrar um veiculo
app.post("/cadastrar", (requisicao, resposta) => {
  try {
    // corpo da requisição com os dados que preciso
    const { placa, modelo, marca, ano, cor, quilometragem, status } = requisicao.body;

    // salvando os dados que enviei ao servidor pela req
    const dados = { placa, modelo, marca, ano, cor, quilometragem, status };

    // Vericando se todos os campos foram preenchidos, caso não retorna erro 400
    if ( !placa || !modelo || !marca || !ano || !cor || !quilometragem || !status) {
        
      return resposta
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatorios!" });
    }

    // Salvando os dados em array(memoria) via push
    veiculos.push(dados);

    // resposta informando que o veiculo foi cadastrado
    // codigo http para created
    resposta.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });
  } catch (error) {
    resposta
      .status(500)
      .json({ mensagem: "Erro ao cadastrar veículo!", erro: error });
  }
});

app.put("/editar/:placa", (requisicao, resposta) => {
  try {
    const placa = requisicao.params.placa
    const veiculo = veiculos.find(veiculo => veiculo.placa === placa)
    if(!veiculo){
      return resposta.status(404).json({mensagem: "Veículo não encontrado!"})
    }
    // enviando para o servidor novos dados para editar o veiculo
    const { novaQuilometragem, novoStatus } = requisicao.body
    if(!novaQuilometragem || !novoStatus){
      return resposta.status(400).json({mensagem: "Todos os campos para edição são obrigatorios!"})
    }

    veiculo.quilometragem = novaQuilometragem
    veiculo.status = novoStatus

    resposta.status(200).json({mensagem: "Veículo atualizado com sucesso!"})
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao editar o veículo!", erro: error})
  }
});

app.patch("/editar/:placa", (requisicao, resposta) =>  {
  try {
    const placa = requisicao.params.placa
    const veiculo = veiculos.find(veiculo => veiculo.placa === placa)
    if(!veiculo){
      return resposta.status(404).json({mensagem: "Veículo não encontrado!"})
    }
    const { novaQuilometragem, novoStatus } = requisicao.body
    
    veiculo.quilometragem = novaQuilometragem || veiculo.quilometragem
    veiculo.status = novoStatus || veiculo.status

    resposta.status(200).json({mensagem: "Veículo atualizado com sucesso!"})
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao editar o Veículo!", erro: error})
  }
})

app.delete("/excluir/todos", (requisicao, resposta) => {
  try {
    veiculos.length = 0
    resposta.status(200).json({mensagem: "Todos os veículos foram excluidos!"})
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao excluir os veículos!", erro: error})
  }
} )

app.delete("/excluir/:placa", (requisicao, resposta) => {
  try {
    const placa = requisicao.params.placa
    const veiculoIndex = veiculos.findIndex(veiculo => veiculo.placa === placa)
    if(veiculoIndex === -1){
      return resposta.status(400).json({mensagem: "Veículo não encontrado!"})
    }
    veiculos.splice(veiculoIndex,1)
    resposta.status(200).json({mensagem: "Veículo excluido com sucesso!"})
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao excluir os veículos!", erro: error})
  }
})

app.listen(porta, () => {
  console.log(`O servidor está em execução!`);
});

