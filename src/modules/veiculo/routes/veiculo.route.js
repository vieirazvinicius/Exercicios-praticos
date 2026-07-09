import express from 'express'
import VeiculoController from "../controllers/veiculo.controller.js";

const router = express.Router();

router.get("/listar", VeiculoController.listarTodos)
router.get("/listar/:placa", VeiculoController.listarPorPlaca)
router.post("/cadastrar", VeiculoController.cadastrar)
router.put("/editar/total/:placa", VeiculoController.editarTotal)
router.patch("/editar/parcial/:placa", VeiculoController.editarParcial)
router.delete("/excluir/:placa", VeiculoController.excluirPorPlaca)
router.delete("/excluir", VeiculoController.excluirTodos)

export default router