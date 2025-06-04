import { Router } from 'express';
import { AuthService } from '../services/Auth.service';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await AuthService.login(email, senha);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
