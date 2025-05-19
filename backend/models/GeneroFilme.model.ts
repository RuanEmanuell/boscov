import { Filme, Genero } from "@prisma/client";

export interface GeneroFilme {
  idFilme: number;
  idGenero: number;
  filme?: Filme;
  genero?: Genero;
}
