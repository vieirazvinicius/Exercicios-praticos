import express from 'express'
import VeiculoController from "../controllers/veiculo.controller.js";

const router = express.Router();

router.get("/listar", VeiculoController.listarTodos)
router.get("/listar/:placa", VeiculoController.listarPorPlaca)
router.post("/cadastrar", VeiculoController.cadastrar)
router.put("/editar/total/:veiculo", VeiculoController.editarTotal)
router.patch("/editar/parcial/:veiculo", VeiculoController.editarParcial)
router.delete("/excluir/:veiculo", VeiculoController.excluirPorPlaca)
router.delete("/excluir/todos", VeiculoController.excluirTodos)

export default router