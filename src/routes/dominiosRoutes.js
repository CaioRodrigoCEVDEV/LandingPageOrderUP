const express = require("express");
const router = express.Router();
const dominiosController = require("../controllers/dominiosController");
//const autenticarToken = require("../middlewares/middlewares");

router.get("/api/dominios",dominiosController.listarDominios);

module.exports = router;
