import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  
  app.enableCors({
    origin: "http://localhost:3001"
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  app.setGlobalPrefix('api');  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
