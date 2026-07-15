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
    const dados = [placa, modelo, marca, ano, cor, quilometragem, status];
    const query = `insert into veiculo(placa, modelo, marca, ano, cor, quilometragem, status) values($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const resultado = await conexao.query(query, dados);
    return resultado.rows;
  }

  static async listarTodos() {
    const query = `select * from veiculo`;
    const resultado = await conexao.query(query);
    return resultado.rows;
  }

  static async listarPorPlaca(placa) {
    const dados = [placa];
    const query = `select * from veiculo where placa = $1`;
    const resultado = await conexao.query(query, dados);
    return resultado.rows;
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
    return resultado.rows;
  }

  static async editarParcial(placa, novaQuilometragem, novoStatus) {
    const veiculo = await VeiculoModel.listarPorPlaca(placa);

    if (veiculo.length === 0) {
      return null;
    }

    const dados = [placa, novaQuilometragem, novoStatus];
    const query = `update veiculo
        set quilometragem = coalesce($2, quilometragem), status = coalesce($3, status)
        where placa = $1 returning *;`;
    const resultado = await conexao.query(query, dados);
    return resultado.rows;
  }

  static async excluirPorPlaca(placa) {
    const veiculo = await VeiculoModel.listarPorPlaca(placa);
    if (veiculo.length === 0){
      return null;
    }
    const dados = [placa]
    const query = `delete from veiculo where placa = $1 returning *`
    const resultado = await conexao.query(query, dados)
    return resultado.rows;
  }

  static async excluirTodos() {
   const query =`delete from placa returning *`
   const resultado = await conexao.query(query)
   return resultado.rows;
  }
}

export default VeiculoModel;
