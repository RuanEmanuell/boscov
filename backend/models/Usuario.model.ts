import { Avaliacao } from "@prisma/client";

export interface Usuario {
  id: number;
  nome: string;
  senha: string;
  email: string;
  status: boolean;
  apelido?: string | null;
  dataNascimento: Date;
  dataCriacao: Date;
  dataAtualizacao: Date;
  tipoUsuario: string;
  avaliacoes?: Avaliacao[]; 
}
