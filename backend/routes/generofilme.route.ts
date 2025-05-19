import { Router } from 'express';
import { GeneroFilmeService } from '../services/generofilme.service';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const rel = await GeneroFilmeService.criarRelacionamento(req.body);
    res.json(rel);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (_req, res) => {
  const rels = await GeneroFilmeService.listarRelacionamentos();
  res.json(rels);
});

router.get('/:idFilme/:idGenero', async (req, res) => {
  try {
    const rel = await GeneroFilmeService.buscarRelacionamento(
      +req.params.idFilme,
      +req.params.idGenero
    );
    res.json(rel);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

router.delete('/:idFilme/:idGenero', async (req, res) => {
  try {
    const result = await GeneroFilmeService.deletarRelacionamento(
      +req.params.idFilme,
      +req.params.idGenero
    );
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
