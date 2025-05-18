import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando a inicialização do banco de dados...');

  // Limpar o banco de dados
  console.log('Limpando o banco de dados...');
  await prisma.notification.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.message.deleteMany();
  await prisma.note.deleteMany();
  await prisma.task.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.document.deleteMany();
  await prisma.process.deleteMany();
  await prisma.user.deleteMany();

  // Criar usuários
  console.log('Criando usuários...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  const advogadoPassword = await bcrypt.hash('advogado123', 10);
  const clientePassword = await bcrypt.hash('cliente123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@jurisflow.com',
      name: 'Administrador',
      password: adminPassword,
      role: 'ADMIN'
    }
  });

  const advogado = await prisma.user.create({
    data: {
      email: 'advogado@jurisflow.com',
      name: 'João Silva',
      password: advogadoPassword,
      role: 'ADVOGADO'
    }
  });

  const cliente = await prisma.user.create({
    data: {
      email: 'cliente@jurisflow.com',
      name: 'Maria Oliveira',
      password: clientePassword,
      role: 'CLIENTE'
    }
  });

  // Criar processos
  console.log('Criando processos...');
  const processo1 = await prisma.process.create({
    data: {
      number: 'PROC-2023-001',
      title: 'Processo de Divórcio',
      description: 'Processo de divórcio litigioso',
      type: 'CIVIL',
      area: 'FAMÍLIA',
      status: 'EM_ANDAMENTO',
      court: 'TJSP',
      judge: 'Dr. Carlos Mendes',
      instance: '1ª INSTÂNCIA',
      priority: 'ALTA',
      emergency: false,
      startDate: new Date('2023-01-15'),
      nextHearing: new Date('2023-06-20'),
      distributionDate: new Date('2023-01-20'),
      users: {
        connect: [
          { id: advogado.id },
          { id: cliente.id }
        ]
      }
    }
  });

  const processo2 = await prisma.process.create({
    data: {
      number: 'PROC-2023-002',
      title: 'Processo Trabalhista',
      description: 'Reclamação trabalhista por horas extras',
      type: 'TRABALHISTA',
      area: 'TRABALHO',
      status: 'AGUARDANDO',
      court: 'TRT-2',
      judge: 'Dra. Ana Santos',
      instance: '1ª INSTÂNCIA',
      priority: 'MEDIA',
      emergency: false,
      startDate: new Date('2023-02-10'),
      nextHearing: new Date('2023-07-15'),
      distributionDate: new Date('2023-02-15'),
      users: {
        connect: [
          { id: advogado.id },
          { id: cliente.id }
        ]
      }
    }
  });

  // Criar documentos
  console.log('Criando documentos...');
  await prisma.document.create({
    data: {
      title: 'Petição Inicial',
      description: 'Petição inicial do processo de divórcio',
      type: 'PETICAO',
      fileUrl: 'https://storage.jurisflow.com/docs/peticao-inicial.pdf',
      processId: processo1.id,
      userId: advogado.id
    }
  });

  await prisma.document.create({
    data: {
      title: 'Contrato de Prestação de Serviços',
      description: 'Contrato de prestação de serviços advocatícios',
      type: 'CONTRATO',
      fileUrl: 'https://storage.jurisflow.com/docs/contrato.pdf',
      processId: processo1.id,
      userId: advogado.id
    }
  });

  // Criar compromissos
  console.log('Criando compromissos...');
  await prisma.appointment.create({
    data: {
      title: 'Audiência de Conciliação',
      description: 'Audiência de conciliação do processo de divórcio',
      type: 'AUDIENCIA',
      status: 'AGENDADO',
      startDate: new Date('2023-06-20T10:00:00Z'),
      endDate: new Date('2023-06-20T12:00:00Z'),
      location: 'Fórum Central - Sala 305',
      processId: processo1.id,
      userId: advogado.id
    }
  });

  // Criar pagamentos
  console.log('Criando pagamentos...');
  await prisma.payment.create({
    data: {
      amount: 5000.00,
      description: 'Honorários iniciais',
      type: 'HONORARIOS',
      status: 'PAGO',
      dueDate: new Date('2023-01-20'),
      paymentDate: new Date('2023-01-18'),
      paymentMethod: 'TRANSFERÊNCIA BANCÁRIA',
      processId: processo1.id
    }
  });

  await prisma.payment.create({
    data: {
      amount: 1500.00,
      description: 'Custas processuais',
      type: 'CUSTAS',
      status: 'PENDENTE',
      dueDate: new Date('2023-03-15'),
      paymentMethod: 'BOLETO BANCÁRIO',
      processId: processo1.id
    }
  });

  // Criar tarefas
  console.log('Criando tarefas...');
  await prisma.task.create({
    data: {
      title: 'Preparar para audiência',
      description: 'Preparar documentos e argumentos para a audiência de conciliação',
      status: 'PENDENTE',
      dueDate: new Date('2023-06-15'),
      processId: processo1.id
    }
  });

  // Criar notas
  console.log('Criando notas...');
  await prisma.note.create({
    data: {
      content: 'Cliente solicitou informações sobre o andamento do processo',
      processId: processo1.id,
      userId: advogado.id
    }
  });

  // Criar mensagens
  console.log('Criando mensagens...');
  await prisma.message.create({
    data: {
      content: 'Olá, gostaria de saber quando será a próxima audiência?',
      processId: processo1.id,
      senderId: cliente.id,
      receiverId: advogado.id
    }
  });

  await prisma.message.create({
    data: {
      content: 'A próxima audiência está agendada para o dia 20/06/2023 às 10h.',
      processId: processo1.id,
      senderId: advogado.id,
      receiverId: cliente.id
    }
  });

  // Criar atendimentos
  console.log('Criando atendimentos...');
  await prisma.attendance.create({
    data: {
      description: 'Atendimento inicial para análise do caso',
      processId: processo1.id,
      userId: advogado.id
    }
  });

  // Criar notificações
  console.log('Criando notificações...');
  await prisma.notification.create({
    data: {
      title: 'Nova audiência agendada',
      message: 'Uma nova audiência foi agendada para o processo PROC-2023-001',
      userId: advogado.id,
      processId: processo1.id
    }
  });

  await prisma.notification.create({
    data: {
      title: 'Pagamento pendente',
      message: 'Existe um pagamento pendente para o processo PROC-2023-001',
      userId: cliente.id,
      processId: processo1.id
    }
  });

  console.log('Inicialização do banco de dados concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao inicializar o banco de dados:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 