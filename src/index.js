// src/index.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");

// raiz do projeto (um nível acima de /src)
const ROOT = path.resolve(__dirname, "..");

// carrega o .env da raiz
require("dotenv").config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// middlewares
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// estáticos
app.use(express.static(path.join(ROOT, "public")));
app.use("/public", express.static(path.join(ROOT, "public")));

// rotas

const clientesRoutes = require("./routes/clientesRoutes");
app.use(clientesRoutes);

const dominiosRoutes = require("./routes/dominiosRoutes");
app.use(dominiosRoutes);

const lancamentosRoutes = require("./routes/lancamentosRoutes");
app.use(lancamentosRoutes);

app.get(["/", "/index"], (req, res) => {
  res.sendFile(path.join(ROOT, "public/html/index.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(ROOT, "public/html/login.html"));
});
app.get("/painel", (req, res) => {
  res.sendFile(path.join(ROOT, "public/html/painel.html"));
});
app.get("/teste", (req, res) => res.json({ ok: true }));

// 404
app.use((req, res) => {
  const notFoundHtml = path.join(ROOT, "dist/404.html");
  if (fs.existsSync(notFoundHtml)) return res.status(404).sendFile(notFoundHtml);
  res.status(404).send("Not Found");
});

// erros
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ status, message: err.message || "Erro interno" });
});

// start
app.listen(PORT, () => {
  const base =  `http://localhost:${PORT}`;
  console.log(`Servidor rodando em ${base} (PORT=${PORT})`);
});
