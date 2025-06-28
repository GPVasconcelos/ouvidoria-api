import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Carrega variáveis de ambiente localmente (.env)
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // Configuração de CORS — permite requisições do frontend V0 ou qualquer outro domínio
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*', // pode ser substituído por um domínio específico
    credentials: true,
  });

  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`🚀 API Ouvidoria rodando em http://localhost:${port}`);
}
bootstrap();
