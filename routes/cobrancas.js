import { prisma } from '../lib/prisma.js';

export default async function cobrancaRoutes(fastify, opts) {
  // Criar nova cobrança
  fastify.post('/cobrancas', async (req, reply) => {
    try {
      const { clienteId, valor, dataVencimento, metodoEnvio } = req.body;

      if (!clienteId || !valor || !dataVencimento) {
        return reply.code(400).send({ erro: "Campos obrigatórios não preenchidos" });
      }

      const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } });
      if (!cliente) {
        return reply.code(404).send({ erro: "Cliente não encontrado" });
      }

      const cobranca = await prisma.cobranca.create({
        data: {
          clienteId,
          valor,
          dataVencimento: new Date(dataVencimento),
          status: "pendente",
          metodoEnvio: metodoEnvio || "simulado",
        },
      });

      return reply.code(201).send(cobranca);
    } catch (error) {
      console.error("Erro ao criar cobrança:", error);
      return reply.code(500).send({ erro: "Erro interno ao criar cobrança" });
    }
  });

  // Listar todas as cobranças
  fastify.get('/cobrancas', async (req, reply) => {
    try {
      const cobrancas = await prisma.cobranca.findMany({
        include: {
          cliente: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return cobrancas;
    } catch (error) {
      console.error("Erro ao listar cobranças:", error);
      return reply.code(500).send({ erro: "Erro interno ao listar cobranças" });
    }
  });
}
