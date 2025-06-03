import { Router } from 'express';
import { GeneroService } from '../services/genero.service';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const genero = await GeneroService.criarGenero(req.body);
    res.json(genero);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (_req, res) => {
  const generos = await GeneroService.listarGeneros();
  res.json(generos);
});

router.get('/:id', async (req, res) => {
  console.log("teste");
  try {
    const genero = await GeneroService.buscarGeneroPorId(+req.params.id);
    res.json(genero);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const genero = await GeneroService.atualizarGenero(+req.params.id, req.body);
    res.json(genero);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await GeneroService.deletarGenero(+req.params.id);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
