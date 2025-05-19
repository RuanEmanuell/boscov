import { Filme, Usuario } from "@prisma/client";

export interface Avaliacao {
  idUsuario: number;
  idFilme: number;
  nota: number;
  comentario?: string | null;
  usuario?: Usuario;
  filme?: Filme;
}
