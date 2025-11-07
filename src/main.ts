import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('AxiaCRM API')
    .setDescription('API de Gestão de Clientes e Oportunidades')
    .setVersion('1.0')
    .addBearerAuth() // Se usar JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`🚀 Backend NestJS rodando em http://localhost:${PORT}`);
    console.log(`📚 Swagger disponível em http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
