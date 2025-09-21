const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");
//const autenticarToken = require("../middlewares/middlewares");

router.get("/api/clientes",clientesController.listarClientes);

module.exports = router;
