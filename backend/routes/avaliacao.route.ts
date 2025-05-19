import { Router } from 'express';
import { AvaliacaoService } from '../services/avaliacao.service';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const avaliacao = await AvaliacaoService.criarAvaliacao(req.body);
    res.json(avaliacao);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (_req, res) => {
  const avaliacoes = await AvaliacaoService.listarAvaliacoes();
  res.json(avaliacoes);
});

router.get('/:idUsuario/:idFilme', async (req, res) => {
  try {
    const avaliacao = await AvaliacaoService.buscarAvaliacao(
      +req.params.idUsuario,
      +req.params.idFilme
    );
    res.json(avaliacao);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

router.put('/:idUsuario/:idFilme', async (req, res) => {
  try {
    const avaliacao = await AvaliacaoService.atualizarAvaliacao(
      +req.params.idUsuario,
      +req.params.idFilme,
      req.body
    );
    res.json(avaliacao);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:idUsuario/:idFilme', async (req, res) => {
  try {
    const result = await AvaliacaoService.deletarAvaliacao(
      +req.params.idUsuario,
      +req.params.idFilme
    );
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
