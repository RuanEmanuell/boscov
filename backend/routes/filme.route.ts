import { Router } from 'express';
import { FilmeService } from '../services/filme.service';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const filme = await FilmeService.criarFilme(req.body);
    res.json(filme);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (_req, res) => {
  const filmes = await FilmeService.listarFilmes();
  res.json(filmes);
});

router.get('/:id', async (req, res) => {
  try {
    const filme = await FilmeService.buscarFilmePorId(+req.params.id);
    res.json(filme);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const filme = await FilmeService.atualizarFilme(+req.params.id, req.body);
    res.json(filme);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await FilmeService.deletarFilme(+req.params.id);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
