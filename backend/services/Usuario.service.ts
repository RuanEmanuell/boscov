import { Usuario } from '@prisma/client';
import { UsuarioRepository } from '../repositories/usuario.repository';

export const UsuarioService = {
  async criarUsuario(dados: Omit<Usuario, 'id' | 'dataCriacao' | 'dataAtualizacao'>) {
    if (!dados.email.includes('@')) {
      throw new Error('Email inválido');
    }

    const usuarioCriado = await UsuarioRepository.criar(dados);
    return usuarioCriado;
  },

  async buscarUsuarioPorId(id: number) {
    const usuario = await UsuarioRepository.buscarPorId(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    return usuario;
  },

  async atualizarUsuario(id: number, dados: Partial<Usuario>) {
    const usuarioExistente = await UsuarioRepository.buscarPorId(id);
    if (!usuarioExistente) {
      throw new Error('Usuário não encontrado');
    }

    const usuarioAtualizado = await UsuarioRepository.atualizar(id, dados);
    return usuarioAtualizado;
  },

  async deletarUsuario(id: number) {
    const usuarioExistente = await UsuarioRepository.buscarPorId(id);
    if (!usuarioExistente) {
      throw new Error('Usuário não encontrado');
    }
    await UsuarioRepository.deletar(id);
    return { message: 'Usuário deletado com sucesso' };
  }
};
