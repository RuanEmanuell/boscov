import { PrismaClient, Usuario } from '@prisma/client';

const prisma = new PrismaClient();

export const UsuarioRepository = {
  async criar(dados: Omit<Usuario, 'id' | 'dataCriacao' | 'dataAtualizacao'>) {
    return prisma.usuario.create({ data: dados });
  },

  async buscarPorId(id: number) {
    return prisma.usuario.findUnique({ where: { id } });
  },

  async buscarPorEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email } });
  },

  async listarTodos() {
    return prisma.usuario.findMany();
  },

  async atualizar(id: number, dados: Partial<Usuario>) {
    return prisma.usuario.update({
      where: { id },
      data: dados,
    });
  },

  async deletar(id: number) {
    return prisma.usuario.delete({ where: { id } });
  }
};
