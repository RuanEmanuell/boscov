export interface GeneroType {
  id: number;
  descricao: string;
}

export interface FilmeType {
  id?: number;
  nome: string;
  diretor?: string;
  anoLancamento: number;
  duracao: string;
  produtora: string;
  classificacao: string;
  poster: string;
  generos: number[];  
}
