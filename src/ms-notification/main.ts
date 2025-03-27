import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { NotificationModule } from "./notification.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationModule, {
        transport: Transport.RMQ,
        options: {
            urls: ["amqp://localhost:5672"],
            queue: "notification_queue",
        }
    });

    await app.listen();
}

bootstrap();