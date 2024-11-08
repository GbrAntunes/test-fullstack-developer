import Fastify, { FastifyRequest } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { PrismaClient, Task } from '@prisma/client'
import bcrypt from 'bcrypt'
import { User } from './types/user'

const fastify = Fastify()
const prisma = new PrismaClient()

fastify.register(fastifyJwt, { secret: 'api-secret-key' })

fastify.addHook("onRequest", async (request, reply) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

fastify.post('/user', async (request, reply) => {
  const { email, password, name } = request.body as User

  // Verifica se o email já existe
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return reply.status(400).send({ error: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  })

  return reply.send({ message: 'User created successfully', user })
})

fastify.post('/login', async (request, reply) => {
  const { email, password } = request.body as { email: string; password: string }

  // Busca o usuário
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return reply.status(400).send({ error: 'Invalid email or password' })
  }

  // Verifica a senha
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return reply.status(400).send({ error: 'Invalid email or password' })
  }

  const token = fastify.jwt.sign({
    id: user.id,
    email: user.email,
    name: user.name
  })

  return reply.send({ token })
});

fastify.get('/user', async (request, reply) => {
  return reply.send(request.user)
});

fastify.post('/task', async (request, reply) => {
  const user = { id: 1 }

  const { title } = request.body as Task;

  if (!title) {
    return reply.status(400).send({ error: 'Title is required' });
  }

  if (!(user.id)) {
    return reply.send({ message: "It wasn't possible to find a user id" })
  }

  try {
    const post = await prisma.task.create({
      data: {
        title,
        userId: user.id,
      },
    });

    return reply.send({ message: 'Post created successfully', post });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Failed to create post' });
  }
});

fastify.get('/task', async (request, reply) => {
  const user = { id: 1 }

  if (!(user.id)) {
    return reply.send({ message: "It wasn't possible to find a user id" })
  }

  try {
    const tasks = await prisma.task.findMany({ where: { userId: user.id }})

    return reply.send({ data: tasks });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Failed to get tasks' });
  }
});

fastify.get('/task/:taskId', async (request, reply) => {
  const user = { id: 1 }
  const { taskId } = request.params as { taskId: number }

  if (!(user.id)) {
    return reply.send({ message: "User id not defined" })
  }

  try {
    const task = await prisma.task.findFirst({ where: {
      AND: [
        { id: Number(taskId) },
        { userId: user.id }
      ]
    }})

    return reply.send(task);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Failed to get task' });
  }
});

fastify.delete('/task/:taskId', async (request, reply) => {
  const user = { id: 1 }
  const { taskId } = request.params as { taskId: number }

  if (!(user.id)) {
    return reply.send({ message: "It wasn't possible to find a user id" })
  }

  try {
    const tasks = await prisma.task.findMany({ where: { userId: user.id }})

    return reply.send({ data: tasks });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Failed to get tasks' });
  }
});

fastify.decorate('authenticate', async (request, reply) => {
  try {
    await request.jwtVerify()
    request.user = request.user
  } catch (err) {
    reply.send(err)
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
    console.log('Server listening on http://localhost:3001')
  } catch (err) {
    process.exit(1)
  }
};

start()
