import { PrismaClient, Usuario } from '@prisma/client';

import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

export const UsuarioRepository = {

async criar(dados: Omit<Usuario, 'id' | 'dataCriacao' | 'dataAtualizacao'>) {
  return prisma.usuario.create({
    data: {
      ...dados,
      senha: await bcrypt.hash(dados.senha, 10),
      dataNascimento: new Date(dados.dataNascimento),  
      status: true,
      tipoUsuario: 'C',
    }
  });
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
