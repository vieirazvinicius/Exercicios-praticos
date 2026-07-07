import veiculo from "../../../config/database.js"
import alunos from "../../../config/database.js"

class VeiculoModel{
    static cadastrar(placa, modelo, marca, ano, cor, quilometragem, status){
        const veiculo = { placa, modelo, marca, ano, cor, quilometragem, status }
        veiculos.push(veiculo)
        return veiculo
    }

    static listarTodos(){
        return veiculos
        }

    static listarPorPlaca(placa){
        const veiculo = veiculos.find(veiculo => veiculo.placa === placa)
        return veiculo
    }

    static editarTotal(placa, novaQuilometragem, novoStatus){
       const veiculo = VeiculoModel.listarPorPlaca(placa)

       if(!placa){
            return null
       }

        veiculo.quilometragem = novaQuilometragem
        veiculo.status = novoStatus

       return veiculo
    }

    static editarParcial(placa, novaQuilometragem, novoStatus){
        const veiculo = VeiculoModel.listarPorPlaca(placa)

        if(!placa){
            return null
        }

        veiculo.quilometragem = novaQuilometragem
        veiculo.status = novoStatus

        return veiculo
    }

    static excluir(placa){
        const index = veiculos.findIndex(veiculo => veiculo.placa === placa)

        if(index === -1){
            return null
        }

        const veiculoRemovido = veiculos.splice(index, 1)
        return veiculoRemovido[0]
    }

    static excluirTodos(){
        veiculos.length = 0
    }
}

export default VeiculoModelModel