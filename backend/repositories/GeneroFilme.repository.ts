import { GeneroFilme, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GeneroFilmeRepository = {
  async criar(dados: GeneroFilme) {
    return prisma.generoFilme.create({ data: dados });
  },

  async buscarPorIds(idFilme: number, idGenero: number) {
    return prisma.generoFilme.findUnique({
      where: { idFilme_idGenero: { idFilme, idGenero } }
    });
  },

  async listarTodos() {
    return prisma.generoFilme.findMany({ include: { filme: true, genero: true } });
  },

  async deletar(idFilme: number, idGenero: number) {
    return prisma.generoFilme.delete({
      where: { idFilme_idGenero: { idFilme, idGenero } }
    });
  }
};
