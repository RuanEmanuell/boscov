import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const FilmeRepository = {
  async criar(data: any) {
    return prisma.filme.create({ data });
  },

  async listarTodos() {
    return prisma.filme.findMany({ include: { generos: true, avaliacoes: true } });
  },

  async buscarPorId(id: number) {
    return prisma.filme.findUnique({ where: { id }, include: { generos: true, avaliacoes: true } });
  },

  async atualizar(id: number, data: any) {
    return prisma.filme.update({ where: { id }, data });
  },

  async deletar(id: number) {
    return prisma.filme.delete({ where: { id } });
  }
};
