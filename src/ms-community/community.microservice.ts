import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { CommunityModule } from "./community.module";

async function bootstrap () {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(CommunityModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
            queue: "community_queue",
            queueOptions: { durable: false }
        }
    });

    await app.listen();
}

bootstrap();