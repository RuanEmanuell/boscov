import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config(); 

const prisma = new PrismaClient();

const SECRET = process.env.JWT_SECRET;

export const AuthService = {
  async login(email: string, senha: string) {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new Error('Senha incorreta.');
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario
      },
      SECRET!,
      { expiresIn: '7d' }
    );

    const { senha: _, ...usuarioSemSenha } = usuario;

    return { token, usuario: usuarioSemSenha };
  }
};
