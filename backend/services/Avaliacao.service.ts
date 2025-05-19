import { Avaliacao } from '@prisma/client';
import { AvaliacaoRepository } from '../repositories/avaliacao.repository';

export const AvaliacaoService = {
  async criarAvaliacao(dados: Avaliacao) {
    const existente = await AvaliacaoRepository.buscarPorIds(dados.idUsuario, dados.idFilme);
    if (existente) {
      throw new Error('Avaliação já existe para esse usuário e filme');
    }

    if (dados.nota < 0 || dados.nota > 10) {
      throw new Error('Nota deve estar entre 0 e 10');
    }

    return AvaliacaoRepository.criar(dados);
  },

  async buscarAvaliacao(idUsuario: number, idFilme: number) {
    const avaliacao = await AvaliacaoRepository.buscarPorIds(idUsuario, idFilme);
    if (!avaliacao) throw new Error('Avaliação não encontrada');
    return avaliacao;
  },

  async listarAvaliacoes() {
    return AvaliacaoRepository.listarTodos();
  },

  async atualizarAvaliacao(idUsuario: number, idFilme: number, dados: Partial<Avaliacao>) {
    const avaliacao = await AvaliacaoRepository.buscarPorIds(idUsuario, idFilme);
    if (!avaliacao) throw new Error('Avaliação não encontrada');

    if (dados.nota !== undefined && (dados.nota < 0 || dados.nota > 10)) {
      throw new Error('Nota deve estar entre 0 e 10');
    }

    return AvaliacaoRepository.atualizar(idUsuario, idFilme, dados);
  },

  async deletarAvaliacao(idUsuario: number, idFilme: number) {
    const avaliacao = await AvaliacaoRepository.buscarPorIds(idUsuario, idFilme);
    if (!avaliacao) throw new Error('Avaliação não encontrada');
    await AvaliacaoRepository.deletar(idUsuario, idFilme);
    return { message: 'Avaliação deletada com sucesso' };
  },
};
