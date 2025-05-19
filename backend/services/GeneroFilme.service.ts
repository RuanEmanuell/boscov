import { GeneroFilme } from '@prisma/client';
import { GeneroFilmeRepository } from '../repositories/generofilme.repository';

export const GeneroFilmeService = {
  async criarRelacionamento(dados: GeneroFilme) {
    const existente = await GeneroFilmeRepository.buscarPorIds(dados.idFilme, dados.idGenero);
    if (existente) {
      throw new Error('Relacionamento entre filme e gênero já existe');
    }
    return GeneroFilmeRepository.criar(dados);
  },

  async buscarRelacionamento(idFilme: number, idGenero: number) {
    const rel = await GeneroFilmeRepository.buscarPorIds(idFilme, idGenero);
    if (!rel) throw new Error('Relacionamento não encontrado');
    return rel;
  },

  async listarRelacionamentos() {
    return GeneroFilmeRepository.listarTodos();
  },

  async deletarRelacionamento(idFilme: number, idGenero: number) {
    const rel = await GeneroFilmeRepository.buscarPorIds(idFilme, idGenero);
    if (!rel) throw new Error('Relacionamento não encontrado');
    await GeneroFilmeRepository.deletar(idFilme, idGenero);
    return { message: 'Relacionamento deletado com sucesso' };
  }
};
