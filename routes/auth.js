// routes/auth.js
import { prisma } from '../lib/prisma.js'

export default async function authRoutes(fastify, opts) {
  // Cadastro
  fastify.post('/cadastro', async (req, reply) => {
    const { email, senha } = req.body;

    const existente = await prisma.usuario.findUnique({ where: { email } });
    if (existente) {
      return reply.code(400).send({ erro: 'Usuário já existe' });
    }

    const novoUsuario = await prisma.usuario.create({
      data: { email, senha },
    });

    return { mensagem: 'Usuário cadastrado com sucesso' };
  });

  // Login
  fastify.post('/login', async (req, reply) => {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario || usuario.senha !== senha) {
      return reply.code(401).send({ erro: 'Credenciais inválidas' });
    }

    return { mensagem: 'Login realizado com sucesso' };
  });
}
