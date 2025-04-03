import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AuthModule } from "./auth.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
            queue: "auth_queue",
            queueOptions: { durable: false }
        }
    });

    await app.listen();
}

bootstrap();