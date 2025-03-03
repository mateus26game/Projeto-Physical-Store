import express from "express";
import storeRoutes from "./modules/stores/routes/store.routes";

const app = express();

app.use(express.json());

app.use("/api", storeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
