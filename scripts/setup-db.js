const { execSync } = require('child_process');
const path = require('path');

// Função para executar comandos
function runCommand(command) {
  try {
    console.log(`Executando: ${command}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Erro ao executar o comando: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

// Diretório do projeto
const projectDir = path.resolve(__dirname, '..');

// Executar as migrações do Prisma
console.log('Executando migrações do Prisma...');
runCommand(`cd ${projectDir} && npx prisma migrate dev --name init`);

// Gerar o cliente Prisma
console.log('Gerando o cliente Prisma...');
runCommand(`cd ${projectDir} && npx prisma generate`);

// Inicializar o banco de dados com dados de exemplo
console.log('Inicializando o banco de dados com dados de exemplo...');
runCommand(`cd ${projectDir} && npx ts-node src/scripts/init-db.ts`);

console.log('Configuração do banco de dados concluída com sucesso!'); 