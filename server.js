import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createRequire } from 'module';

// Configuração do __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega as variáveis de ambiente
dotenv.config();

// Importa o Prisma Client usando CommonJS
const require = createRequire(import.meta.url);
const prisma = require('./prisma.cjs');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Rotas de autenticação
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        photoUrl: user.photoUrl
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rotas de clientes
app.get('/api/clients', authenticateToken, async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(clients);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/clients', authenticateToken, async (req, res) => {
  try {
    const { name, email, phone, cpf, status } = req.body;

    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        cpf,
        status: status || 'active',
        userId: req.user.id
      }
    });

    res.status(201).json(client);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rotas de processos
app.get('/api/processes', authenticateToken, async (req, res) => {
  try {
    const processes = await prisma.process.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        client: true
      }
    });
    res.json(processes);
  } catch (error) {
    console.error('Erro ao buscar processos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/processes', authenticateToken, async (req, res) => {
  try {
    const {
      number,
      title,
      description,
      type,
      area,
      status,
      court,
      judge,
      instance,
      priority,
      emergency,
      startDate,
      nextHearing,
      distributionDate,
      clientId
    } = req.body;

    const process = await prisma.process.create({
      data: {
        number,
        title,
        description,
        type,
        area,
        status: status || 'AGUARDANDO',
        court,
        judge,
        instance,
        priority: priority || 'MEDIA',
        emergency: emergency || false,
        startDate: new Date(startDate),
        nextHearing: nextHearing ? new Date(nextHearing) : null,
        distributionDate: distributionDate ? new Date(distributionDate) : null,
        userId: req.user.id,
        clientId
      }
    });

    res.status(201).json(process);
  } catch (error) {
    console.error('Erro ao criar processo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rotas de documentos
app.get('/api/documents', authenticateToken, async (req, res) => {
  try {
    const { processId } = req.query;
    const documents = await prisma.document.findMany({
      where: {
        userId: req.user.id,
        ...(processId && { processId })
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(documents);
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/documents', authenticateToken, async (req, res) => {
  try {
    const { name, type, description, fileUrl, tags, processId } = req.body;

    const document = await prisma.document.create({
      data: {
        name,
        type,
        description,
        fileUrl,
        tags,
        userId: req.user.id,
        processId
      }
    });

    res.status(201).json(document);
  } catch (error) {
    console.error('Erro ao criar documento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rotas de compromissos
app.get('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const { processId } = req.query;
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: req.user.id,
        ...(processId && { processId })
      },
      orderBy: { startDate: 'asc' }
    });
    res.json(appointments);
  } catch (error) {
    console.error('Erro ao buscar compromissos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      status,
      startDate,
      endDate,
      location,
      processId
    } = req.body;

    const appointment = await prisma.appointment.create({
      data: {
        title,
        description,
        type,
        status: status || 'AGENDADO',
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        userId: req.user.id,
        processId
      }
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Erro ao criar compromisso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para listar advogados online
app.get('/api/availability/online-lawyers', async (req, res) => {
  try {
    const onlineLawyers = await prisma.user.findMany({
      where: {
        role: 'LAWYER',
        isOnline: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        photoUrl: true,
        whatsappNumber: true,
        lastLogin: true
      }
    });
    res.json(onlineLawyers);
  } catch (error) {
    console.error('Erro ao buscar advogados online:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para atualizar status de disponibilidade
app.put('/api/availability/:userId', authenticateToken, async (req, res) => {
  try {
    const { isOnline } = req.body;
    const { userId } = req.params;

    if (userId !== req.user.id) {
      return res.status(403).json({ error: 'Não autorizado' });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        isOnline,
        lastLogin: new Date()
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Erro ao atualizar disponibilidade:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 