import { Router } from 'express';
import { AvaliacaoService } from '../services/avaliacao.service';

const router = Router();

router.get('/filme/:idFilme', async (req, res) => {
  const idFilme = +req.params.idFilme;
  try {
    const avaliacoes = await AvaliacaoService.listarAvaliacoesPorFilme(idFilme);
    res.json(avaliacoes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/usuario/:idUsuario/filme/:idFilme', async (req: any, res: any) => {
  const idUsuario = +req.params.idUsuario;
  const idFilme = +req.params.idFilme;

  try {
    const avaliacao = await AvaliacaoService.buscarAvaliacaoUsuario(idUsuario, idFilme);
    if (!avaliacao) return res.status(404).json({ error: 'Avaliação não encontrada' });
    res.json(avaliacao);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req: any, res: any) => {
  try {
    const { idUsuario, idFilme, nota, comentario } = req.body;
    console.log(req.body)
    if (idUsuario == null || idFilme == null || nota == null) {
      return res.status(400).json({ error: 'idUsuario, idFilme e nota são obrigatórios' });
    }
    const avaliacao = await AvaliacaoService.criarOuAtualizarAvaliacao({ idUsuario, idFilme, nota, comentario });
    res.json(avaliacao);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/usuario/:idUsuario/filme/:idFilme', async (req, res) => {
  const idUsuario = +req.params.idUsuario;
  const idFilme = +req.params.idFilme;
  try {
    await AvaliacaoService.deletarAvaliacao(idUsuario, idFilme);
    res.json({ message: 'Avaliação deletada com sucesso' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
