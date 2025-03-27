import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { CommunityModule } from "./community.module";

async function bootstrap () {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(CommunityModule, {
        transport: Transport.RMQ,
        options: {
            urls: ["amqp://localhost:5672"],
            queue: "community_queue"
        }
    });

    await app.listen();
}

bootstrap();