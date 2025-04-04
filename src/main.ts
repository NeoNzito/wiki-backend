import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';
import { AuthGuard } from './ms-auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

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

  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService)

  app.useGlobalGuards(new AuthGuard(jwtService, reflector));
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
