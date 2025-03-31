import { Injectable } from "@nestjs/common";
import { NotificationGateway } from "./notification.gateway";
import { NotificationDTO } from "./dto/notification.dto";
import { NotificationRepository } from "./repository/notification.repository";

@Injectable()
export class NotificationService {
    constructor(
        private readonly notificationRepository: NotificationRepository,
        private readonly notificationGateway: NotificationGateway
    ) {}

    async handleNewComment(notification: NotificationDTO) {
        return await this.notificationRepository.createNotification(notification);
    }

    async getUserNotifications(userId: string) {

    }

    notifyUser(userId: string, message: string) {
        this.notificationGateway.sendNotification(userId, message);
    }
}