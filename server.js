// GET – Recupera dados (ex: listar produtos).
// POST – Envia dados para o servidor (ex: criar novo usuário).
// PUT – Atualiza dados existentes (ex: editar um perfil).
// PATCH – Atualiza parcialmente um recurso.

// 200 OK – Sucesso
// 201 Created – Recurso criado
// 400 Bad Request – Erro na requisição
// 401 Unauthorized – Não autorizado
// 404 Not Found – Recurso não encontrado
// 500 Internal Server Error – Erro no servidor

import fastify from 'fastify'
import cors from '@fastify/cors'

import authRoutes from './routes/auth.js'
import clienteRoutes from './routes/clientes.js'
import cobrancaRoutes from './routes/cobrancas.js'

import dotenv from 'dotenv';
dotenv.config();

const server = fastify({ logger: true })

server.register(cobrancaRoutes)


// 👇 Registrar o plugin de CORS
await server.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// Registrando as rotas
server.register(authRoutes)
server.register(clienteRoutes)

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  server.log.info(`Servidor rodando em ${address}`)
})

