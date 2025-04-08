import { prisma } from '../lib/prisma.js';

export default async function cobrancaRoutes(fastify, opts) {
  fastify.post('/cobrancas', async (req, reply) => {
    const { clienteId, metodoEnvio } = req.body;

    // Simulação: pega o valor do cliente no banco (pode ser um campo ou cálculo futuro)
    const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } });

    if (!cliente) return reply.code(404).send({ erro: "Cliente não encontrado" });

    const cobranca = await prisma.cobranca.create({
      data: {
        clienteId,
        valor: 1400, // Exemplo fixo, ou puxar do cliente
        status: "pendente",
        metodoEnvio,
      },
    });

    return cobranca;
  });
}
