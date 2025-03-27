import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ModerationModule } from "./moderation.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ModerationModule, {
        transport: Transport.RMQ,
        options: {
            urls: ["amqp://localhost:5672"],
            queue: "moderation_queue"
        }
    });

    await app.listen();
}

bootstrap();