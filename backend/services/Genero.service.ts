import { Genero } from "@prisma/client";
import { GeneroRepository } from '../repositories/genero.repository';

export const GeneroService = {
  async criarGenero(dados: Omit<Genero, 'id' | 'filmes'>) {
    if (!dados.descricao || dados.descricao.trim() === '') {
      throw new Error('Descrição do gênero é obrigatória');
    }
    return GeneroRepository.criar(dados);
  },

  async buscarGeneroPorId(id: number) {
    const genero = await GeneroRepository.buscarPorId(id);
    if (!genero) throw new Error('Gênero não encontrado');
    return genero;
  },

  async listarGeneros() {
    return GeneroRepository.listarTodos();
  },

  async atualizarGenero(id: number, dados: Partial<Genero>) {
    const genero = await GeneroRepository.buscarPorId(id);
    if (!genero) throw new Error('Gênero não encontrado');
    return GeneroRepository.atualizar(id, dados);
  },

  async deletarGenero(id: number) {
    const genero = await GeneroRepository.buscarPorId(id);
    if (!genero) throw new Error('Gênero não encontrado');
    await GeneroRepository.deletar(id);
    return { message: 'Gênero deletado com sucesso' };
  }
};
