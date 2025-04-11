import { prisma } from '../lib/prisma.js';
import { criarSubconta } from '../lib/asaas.js';

export default async function authRoutes(fastify, opts) {
  fastify.post('/cadastro', async (req, reply) => {
    const {
      email,
      senha,
      name,
      cpfCnpj,
      birthDate,
      companyType,
      phone,
      mobilePhone,
      address,
      addressNumber,
      complement,
      province,
      postalCode,
      city,
      state,
      incomeValue,
    } = req.body;

    const existente = await prisma.usuario.findUnique({ where: { email } });
    if (existente) {
      return reply.code(400).send({ erro: 'Usuário já existe' });
    }

    try {
      const subconta = await criarSubconta({
        name,
        email,
        cpfCnpj,
        birthDate,
        companyType,
        phone,
        mobilePhone,
        address,
        addressNumber,
        complement,
        province,
        postalCode,
        city,
        state,
        incomeValue,
      });

      console.log('Subconta criada:', subconta);

      const novoUsuario = await prisma.usuario.create({
        data: {
          email,
          senha,
          asaasId: subconta.id,
        },
      });

      return { mensagem: 'Usuário e subconta criados com sucesso' };
    } catch (error) {
      console.error('Erro ao criar subconta:', error?.response?.data || error.message);
      return reply.code(500).send({ erro: 'Erro ao criar subconta' });
    }
  });

  fastify.post('/login', async (req, reply) => {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario || usuario.senha !== senha) {
      return reply.code(401).send({ erro: 'Credenciais inválidas' });
    }

    return { mensagem: 'Login realizado com sucesso' };
  });
}
