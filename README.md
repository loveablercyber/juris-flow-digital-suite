# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/bf83d6c5-eb85-4a48-92cb-d87155781297

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/bf83d6c5-eb85-4a48-92cb-d87155781297) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/bf83d6c5-eb85-4a48-92cb-d87155781297) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Juris Flow Digital Suite

Sistema de gestão para escritórios de advocacia.

## Configuração do Banco de Dados

O sistema utiliza o Supabase como banco de dados PostgreSQL e o Prisma como ORM.

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL="postgresql://postgres:wyonzomnplhgqnfsuphg@db.wyonzomnplhgqnfsuphg.supabase.co:5432/postgres"
SUPABASE_URL="https://wyonzomnplhgqnfsuphg.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5b256b21ucGxoZ3FuZnN1cGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MjQ3NDAsImV4cCI6MjA2MzEwMDc0MH0.crW6qYg2kAktHHrhD3PREwGpfUwNgjB90AdKt75wDFw"
JWT_SECRET="juris-flow-digital-suite-secret-key"
JWT_EXPIRES_IN="7d"
```

### Comandos Disponíveis

- `npm run prisma:generate`: Gera o cliente Prisma
- `npm run prisma:migrate`: Executa as migrações do banco de dados
- `npm run prisma:studio`: Abre o Prisma Studio para visualizar e editar os dados
- `npm run db:init`: Inicializa o banco de dados com dados de exemplo

### Estrutura do Banco de Dados

O banco de dados possui os seguintes modelos:

- **User**: Usuários do sistema (admin, advogado, cliente)
- **Process**: Processos jurídicos
- **Document**: Documentos relacionados aos processos
- **Appointment**: Compromissos e audiências
- **Payment**: Pagamentos e honorários
- **Task**: Tarefas relacionadas aos processos
- **Note**: Notas e observações
- **Message**: Mensagens entre usuários
- **Attendance**: Atendimentos realizados
- **Notification**: Notificações do sistema

### Dados de Exemplo

O sistema é inicializado com os seguintes dados de exemplo:

- **Usuários**:
  - Admin: admin@jurisflow.com / admin123
  - Advogado: advogado@jurisflow.com / advogado123
  - Cliente: cliente@jurisflow.com / cliente123

- **Processos**:
  - Processo de Divórcio (PROC-2023-001)
  - Processo Trabalhista (PROC-2023-002)

## Desenvolvimento

### Instalação

```bash
npm install
```

### Executando o Projeto

```bash
npm run dev
```

### Construindo o Projeto

```bash
npm run build
```

### Executando o Projeto em Produção

```bash
npm run start
```
