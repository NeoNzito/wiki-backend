import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ModerationModule } from "./moderation.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ModerationModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
            queue: "moderation_queue",
            queueOptions: { durable: false }
        }
    });
    await app.listen();
}

bootstrap();