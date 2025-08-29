import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();
//dotenv.config({ override: true });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração global de pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Validação da chave da API do Google Maps
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.warn(
      '⚠️  GOOGLE_MAPS_API_KEY não configurada. Alguns recursos podem não funcionar.',
    );
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(
    `🌍 Google Maps API: ${
      process.env.GOOGLE_MAPS_API_KEY ? '✅ Configurada' : '❌ Não configurada'
    }`,
  );
}

void bootstrap();
