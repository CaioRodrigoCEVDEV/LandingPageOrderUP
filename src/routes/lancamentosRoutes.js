const express = require("express");
const router = express.Router();
const lancamentosController = require("../controllers/lancamentosController");
//const autenticarToken = require("../middlewares/middlewares");

router.get("/api/lancamentos",lancamentosController.listarLancamentos);

module.exports = router;
