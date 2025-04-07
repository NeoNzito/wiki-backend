import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PrismaModule } from "src/prisma/prisma.module";
import { jwtConstants } from "./jwt/constants";

@Module({
    imports: [
      ClientsModule.register([
          {
            name: "COMMUNITY_SERVICE",
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
              queue: "community_queue",
              queueOptions: { durable: false },
            }
          },
          {
            name: "EMAIL_SERVICE",
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
              queue: "email_queue",
              queueOptions: { durable: false },
            }
          },
          {
            name: "MODERATION_SERVICE",
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
              queue: "moderation_queue",
              queueOptions: { durable: false },
            }
          },
          {
            name: "NOTIFICATION_SERVICE",
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
              queue: "notification_queue",
              queueOptions: { durable: false },
            }
          },
          {
            name: "USER_SERVICE",
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
              queue: "user_queue",
              queueOptions: { durable: false },
            },
          },
          {
            name: "AUTH_SERVICE",
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
              queue: "auth_queue",
              queueOptions: { durable: false },
            }
          },
        ]),
      PrismaModule,
      JwtModule.register({
                  global: true,
                  secret: jwtConstants.secret,
                  signOptions: {
                      expiresIn: jwtConstants.accessExpiresIn
                  },
              }),
    ]
})
export class ApiGatewayModule {}