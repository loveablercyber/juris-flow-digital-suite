import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configurações do ambiente
export const env = {
  // Ambiente
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Banco de dados
  DATABASE_URL: process.env.DATABASE_URL,
  
  // Autenticação
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // Servidor
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',
  
  // Email
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  
  // Upload
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || '5mb',
  
  // Outros
  APP_NAME: process.env.APP_NAME || 'Juris Flow Digital Suite',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  APP_EMAIL: process.env.APP_EMAIL || 'contato@jurisflow.com.br',
  
  // Verifica se todas as variáveis de ambiente necessárias estão definidas
  validate() {
    const required = ['DATABASE_URL'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }
}; 