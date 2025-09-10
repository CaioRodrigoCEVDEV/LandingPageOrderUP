const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Raiz do projeto (um nível acima de /src)
const ROOT = path.resolve(__dirname, "..");

// Disponibiliza /public/* diretamente em / (ex.: /css/..., /images/..., /html/...)
app.use(express.static(path.join(ROOT, "public")));

// Alias opcional para compatibilidade com caminhos que começam com /public/...
app.use("/public", express.static(path.join(ROOT, "public")));

// Rotas de página
app.get(["/", "/index"], (req, res) => {
  res.sendFile(path.join(ROOT, "public/html/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(ROOT, "public/html/login.html"));
});

app.listen(PORT, () => {
  const base = process.env.BASE_URL || `http://localhost:${PORT}`;
  console.log(`Servidor rodando em ${base}`);
});
