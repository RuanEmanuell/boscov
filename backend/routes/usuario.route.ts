import { Router } from 'express';
import { UsuarioService } from '../services/usuario.service';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const usuario = await UsuarioService.criarUsuario(req.body);
    res.json(usuario);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const usuario = await UsuarioService.buscarUsuarioPorId(+req.params.id);
    res.json(usuario);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const usuario = await UsuarioService.atualizarUsuario(+req.params.id, req.body);
    res.json(usuario);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await UsuarioService.deletarUsuario(+req.params.id);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
