import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/prisma/prisma.module";

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
        ]),
      AuthModule,
      PrismaModule,
    ]
})
export class ApiGatewayModule {}