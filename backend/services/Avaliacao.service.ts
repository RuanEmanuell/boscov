import { AvaliacaoRepository } from '../repositories/avaliacao.repository';

export const AvaliacaoService = {
  listarAvaliacoesPorFilme(idFilme: number) {
    return AvaliacaoRepository.buscarPorFilme(idFilme);
  },

  buscarAvaliacaoUsuario(idUsuario: number, idFilme: number) {
    return AvaliacaoRepository.buscarPorUsuarioEFilme(idUsuario, idFilme);
  },

  criarOuAtualizarAvaliacao(data: {
    idUsuario: number;
    idFilme: number;
    nota: number;
    comentario?: string;
  }) {
    return AvaliacaoRepository.criarOuAtualizarAvaliacao(data);
  },

  deletarAvaliacao(idUsuario: number, idFilme: number) {
    return AvaliacaoRepository.deletarAvaliacao(idUsuario, idFilme);
  },
};
