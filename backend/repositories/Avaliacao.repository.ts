import { Avaliacao, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const AvaliacaoRepository = {
  async criar(dados: Avaliacao) {
    return prisma.avaliacao.create({ data: dados });
  },

  async buscarPorIds(idUsuario: number, idFilme: number) {
    return prisma.avaliacao.findUnique({
      where: { idUsuario_idFilme: { idUsuario, idFilme } },
    });
  },

  async listarTodos() {
    return prisma.avaliacao.findMany({ include: { usuario: true, filme: true } });
  },

  async atualizar(idUsuario: number, idFilme: number, dados: Partial<Avaliacao>) {
    return prisma.avaliacao.update({
      where: { idUsuario_idFilme: { idUsuario, idFilme } },
      data: dados,
    });
  },

  async deletar(idUsuario: number, idFilme: number) {
    return prisma.avaliacao.delete({
      where: { idUsuario_idFilme: { idUsuario, idFilme } },
    });
  },
};
