import { Avaliacao, GeneroFilme } from "@prisma/client";

export interface Filme {
  id: number;
  nome: string;
  diretor: string;
  anoLancamento: number;
  duracao: number;
  produtora: string;
  classificacao: string;
  poster: string;
  generos?: GeneroFilme[]; 
  avaliacoes?: Avaliacao[];
}
