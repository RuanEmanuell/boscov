import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const FilmeRepository = {
  async criar(data: any) {
    const filme = await prisma.filme.create({
      data: {
        nome: data.nome,
        diretor: data.diretor,
        anoLancamento: data.anoLancamento,
        duracao: data.duracao,
        produtora: data.produtora,
        classificacao: data.classificacao,
        poster: data.poster
      }
    });

    if (data.generos && Array.isArray(data.generos)) {
      await prisma.generoFilme.createMany({
        data: data.generos.map((generoId: number) => ({
          idFilme: filme.id,
          idGenero: generoId
        })),
        skipDuplicates: true
      });
    }

    return filme;
  },

  async listarTodos() {
    return prisma.filme.findMany({
      include: {
        generos: true,
        avaliacoes: true
      }
    });
  },

  async buscarPorId(id: number) {
    return prisma.filme.findUnique({
      where: { id },
      include: {
        generos: true,
        avaliacoes: true
      }
    });
  },

  async atualizar(id: number, data: any) {
    const filme = await prisma.filme.update({
      where: { id },
      data: {
        nome: data.nome,
        diretor: data.diretor,
        anoLancamento: data.anoLancamento,
        duracao: data.duracao,
        produtora: data.produtora,
        classificacao: data.classificacao,
        poster: data.poster
      }
    });

    if (data.generos && Array.isArray(data.generos)) {
      await prisma.generoFilme.deleteMany({
        where: { idFilme: id }
      });

      await prisma.generoFilme.createMany({
        data: data.generos.map((generoId: number) => ({
          idFilme: id,
          idGenero: generoId
        })),
        skipDuplicates: true
      });
    }

    return filme;
  },

  async deletar(id: number) {
    await prisma.generoFilme.deleteMany({
      where: { idFilme: id }
    });

    await prisma.avaliacao.deleteMany({
      where: { idFilme: id }
    });

    return prisma.filme.delete({
      where: { id }
    });
  }
};
