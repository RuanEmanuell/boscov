import { FilmeRepository } from '../repositories/filme.repository';

export const FilmeService = {
  async criarFilme(data: any) {
    if (data.anoLancamento < 1800) {
      throw new Error('Ano de lançamento inválido');
    }

    const filmeCriado = await FilmeRepository.criar(data);
    return filmeCriado;
  },

  async listarFilmes() {
    return FilmeRepository.listarTodos();
  },

  async buscarFilmePorId(id: number) {
    const filme = await FilmeRepository.buscarPorId(id);
    if (!filme) {
      throw new Error('Filme não encontrado');
    }
    return filme;
  },

  async atualizarFilme(id: number, data: any) {
    const filmeExistente = await FilmeRepository.buscarPorId(id);
    if (!filmeExistente) {
      throw new Error('Filme não encontrado');
    }

    return FilmeRepository.atualizar(id, data);
  },

  async deletarFilme(id: number) {
    const filmeExistente = await FilmeRepository.buscarPorId(id);
    if (!filmeExistente) {
      throw new Error('Filme não encontrado');
    }
    await FilmeRepository.deletar(id);
    return { message: 'Filme deletado com sucesso' };
  }
};
