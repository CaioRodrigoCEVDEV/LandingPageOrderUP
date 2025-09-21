const pool = require("../config/db");

exports.listarClientes = async (req, res) => {
  try {
    const result = await pool.query("select * from clientes");
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao carregar Clientes" });
  }
};

exports.editarCliente = async (req, res) => {
  const { empwhatsapp1, empwhatsapp2, emprazao } = req.body;
  try {
    const result = await pool.query(
      "update emp set empwhatsapp1 = $1, empwhatsapp2 = $2, emprazao=$3 RETURNING *",
      [empwhatsapp1, empwhatsapp2, emprazao]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao carregar dados da empresa" });
  }
};
