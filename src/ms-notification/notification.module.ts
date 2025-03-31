import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { NotificationGateway } from "./notification.gateway";
import { NotificationRepository } from "./repository/notification.repository";

@Module({
    controllers: [NotificationController],
    providers: [
        NotificationService,
        NotificationRepository,
        NotificationGateway,
    ]
})
export class NotificationModule {}