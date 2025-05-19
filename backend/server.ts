import express from "express";
import cors from "cors";
import avaliacoes from "./routes/avaliacao.route";

const env = require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/avaliacoes", avaliacoes);

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});