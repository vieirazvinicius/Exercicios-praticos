import conexao from "../../../config/database.js";

class VeiculoModel {
  static async cadastrar(
    placa,
    modelo,
    marca,
    ano,
    cor,
    quilometragem,
    status,
  ) {
    const dados = { placa, modelo, marca, ano, cor, quilometragem, status };
    const query = `insert into veiculo(placa, modelo, marca, ano, cor, quilometragem, status) values($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const resultado = await conexao.query(query, dados);
    return resultado.rows[0];
  }

  static async listarTodos() {
    const query = `select * form veiculo`;
    const resultado = await conexao.query(query);
    return resultado;
  }

  static async listarPorPlaca(placa) {
    const dados = [placa];
    const query = `select * from veiculo where placa = $1`;
    const resultado = await conexao.query(query, dados);
    return resultado;
  }

  static async editarTotal(placa, novaQuilometragem, novoStatus) {
    const veiculo = await VeiculoModel.listarPorPlaca(placa);

    if (veiculo.length === 0) {
      return null;
    }
    const dados = [placa, quilometragem, status];
    const query = `update veiculo
        set quilometragem = $2, status = $3
        where placa = $1 returning *;`;
    const resultado = await conexao.query(query, dados);
    return resultado.rows[0];
  }

  static editarParcial(placa, novaQuilometragem, novoStatus) {
    const veiculo = VeiculoModel.listarPorPlaca(placa);

    if (!veiculo) {
      return null;
    }

    veiculo.quilometragem = novaQuilometragem;
    veiculo.status = novoStatus;

    return veiculo;
  }

  static excluirPorPlaca(placa) {
    const index = veiculos.findIndex((veiculo) => veiculo.placa === placa);

    if (index === -1) {
      return null;
    }

    const veiculoRemovido = veiculos.splice(index, 1);
    return veiculoRemovido[0];
  }

  static excluirTodos() {
    veiculos.length = 0;
  }
}

export default VeiculoModel;
