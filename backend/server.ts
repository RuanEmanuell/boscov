import express from "express";
import cors from "cors";
import avaliacoes from "./routes/avaliacao.route";
import filmes from "./routes/filme.route";
import generos from "./routes/genero.route";
import generoFilme from "./routes/generoFilme.route";
import usuarios from "./routes/usuario.route";
import auth from "./routes/auth.route";

const env = require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/avaliacoes", avaliacoes);
app.use("/filmes", filmes);
app.use("/generos", generos);
app.use("/genero-filme", generoFilme);
app.use("/usuarios", usuarios);
app.use("/auth", auth);

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
