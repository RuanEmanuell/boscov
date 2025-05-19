import { Genero, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GeneroRepository = {
  async criar(dados: Omit<Genero, 'id' | 'filmes'>) {
    return prisma.genero.create({ data: dados });
  },

  async buscarPorId(id: number) {
    return prisma.genero.findUnique({ where: { id }, include: { filmes: true } });
  },

  async listarTodos() {
    return prisma.genero.findMany({ include: { filmes: true } });
  },

  async atualizar(id: number, dados: Partial<Genero>) {
    return prisma.genero.update({
      where: { id },
      data: dados,
    });
  },

  async deletar(id: number) {
    return prisma.genero.delete({ where: { id } });
  },
};
