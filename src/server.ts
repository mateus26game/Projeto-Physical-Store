import express from "express";
import dotenv from "dotenv";
import pool from "./database";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Conexão com o banco de dados bem-sucedida! Hora atual: ${result.rows[0].now}`);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    res.status(500).send("Erro ao conectar ao banco de dados.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
