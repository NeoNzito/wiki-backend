import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { EmailModule } from "./email.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(EmailModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
            queue: "email_queue",
            queueOptions: { durable: false }
        }
    });

    await app.listen();
}

bootstrap();