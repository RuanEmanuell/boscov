import { GeneroFilme } from "@prisma/client";

export interface Genero {
  id: number;
  descricao: string;
  filmes?: GeneroFilme[];
}
