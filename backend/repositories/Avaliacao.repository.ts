import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const AvaliacaoRepository = {
  async buscarPorFilme(idFilme: number) {
    return prisma.avaliacao.findMany({
      where: { idFilme },
      include: { usuario: true },
    });
  },

  async buscarPorUsuarioEFilme(idUsuario: number, idFilme: number) {
    return prisma.avaliacao.findFirst({
      where: {
        idUsuario,
        idFilme,
      },
    });
  },

  async criarOuAtualizarAvaliacao(data: {
    idUsuario: number;
    idFilme: number;
    nota: number;
    comentario?: string;
  }) {
    const { idUsuario, idFilme, nota, comentario } = data;
    return prisma.avaliacao.upsert({
      where: {
        idUsuario_idFilme: {
          idUsuario,
          idFilme,
        },
      },
      update: { nota, comentario },
      create: { idUsuario, idFilme, nota, comentario },
    });
  },

  async deletarAvaliacao(idUsuario: number, idFilme: number) {
    return prisma.avaliacao.delete({
      where: {
        idUsuario_idFilme: {
          idUsuario,
          idFilme,
        },
      },
    });
  },
};
