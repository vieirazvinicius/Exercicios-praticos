import VeiculoModel from "../models/veiculo.model.js";
import VeiculoModelModel from "../models/veiculo.model.js";

class VeiculoController {
  static async cadastrar(requisicao, resposta) {
    try {
      const { placa, modelo, marca, ano, cor, quilometragem, status } =
        requisicao.body;
      if (
        !placa ||
        !modelo ||
        !marca ||
        !ano ||
        !cor ||
        !quilometragem ||
        !status
      ) {
        return resposta
          .status(400)
          .json({ mensagem: "Todos os campos são obrigatorios!" });
      }
      await VeiculoModel.cadastrar(
        placa,
        modelo,
        marca,
        ano,
        cor,
        quilometragem,
        status,
      );
      resposta
        .status(201)
        .json({ mensagem: "Cadastro realizado com sucesso!" });
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao cadastrar veículo!", erro: error.message });
    }
  }
  static async listarTodos(requisicao, resposta) {
    try {
      const veiculos = await VeiculoModel.listarTodos();
      if (veiculos.length === 0) {
        return resposta
          .status(200)
          .json({ mensagem: "Nenhum veículo cadastrado!" });
      }
      resposta.status(200).json(veiculos);
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao listar veículos!", erro: error.message });
    }
  }
  static async listarPorPlaca(requisicao, resposta) {
    try {
      const placa = requisicao.params.placa;
      const veiculo = await VeiculoModel.listarPorPlaca(placa);
      if (!veiculo) {
        return resposta
          .status(200)
          .json({ mensagem: "Veículo não encontrado!" });
      }
      resposta.status(200).json(veiculo);
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao listar o veículo", erro: error.message });
    }
  }
  static async editarTotal(requisicao, resposta) {
    try {
      const placa = requisicao.params.placa;
      const { novaQuilometragem, novoStatus } = requisicao.body;
      const veiculo = await VeiculoModel.editarTotal(
        placa,
        novaQuilometragem,
        novoStatus,
      );
      resposta.status(200).json(veiculo);
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao editar o veículo!", erro: error.message });
    }
  }
  static async editarParcial(requisicao, resposta) {
    try {
      const placa = requisicao.params.placa;
      const { novaQuilometragem, novoStatus } = requisicao.body;
      const veiculo = await VeiculoModel.editarParcial(
        placa,
        novaQuilometragem,
        novoStatus,
      );
      if(!veiculo){
        return resposta.status(400).json({mensagem: "veiculo não encontrado"})
      }
      resposta.status(200).json(veiculo);
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao editar o veículo!", erro: error.message });
    }
  }
  static async excluirTodos(requisicao, resposta) {
    try {
      await VeiculoModel.excluirTodos();
      resposta
        .status(200)
        .json({ mensagem: "Todos os veículos foram excluídos!" });
    } catch (error) {
      resposta
        .status(500)
        .json({
          mensagem: "Erro ao excluir todos os veículos!",
          erro: error.message,
        });
    }
  }
  static async excluirPorPlaca(requisicao, resposta) {
    try {
      const placa = requisicao.params.placa;
      await VeiculoModel.excluirPorPlaca(placa);
      resposta.status(200).json({ mensagem: "veículo excluido com sucesso!" });
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao excluir veículo!", erro: error.message });
    }
  }
}
export default VeiculoController;
