// routes/clientes.js
import { prisma } from '../lib/prisma.js'

export default async function clienteRoutes(fastify, opts) {
  // Criar cliente
  fastify.post('/clientes', async (req, reply) => {
    const { nome, cpf } = req.body;
    const novo = await prisma.cliente.create({ data: { nome, cpf } });
    return novo;
  });

  // Listar todos
  fastify.get('/clientes', async (req, reply) => {
    return await prisma.cliente.findMany();
  });

  // Editar cliente
  fastify.put('/clientes/:id', async (req, reply) => {
    const { id } = req.params;
    const { nome, cpf } = req.body;

    try {
      const cliente = await prisma.cliente.update({
        where: { id: Number(id) },
        data: { nome, cpf },
      });
      return cliente;
    } catch (e) {
      return reply.code(404).send({ erro: 'Cliente não encontrado' });
    }
  });

  // Deletar cliente
  fastify.delete('/clientes/:id', async (req, reply) => {
    const { id } = req.params;

    try {
      await prisma.cliente.delete({ where: { id: Number(id) } });
      return { mensagem: 'Cliente removido' };
    } catch (e) {
      return reply.code(404).send({ erro: 'Cliente não encontrado' });
    }
  });
}
