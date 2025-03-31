import { Controller, Get, Param } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { ClientProxy, MessagePattern } from "@nestjs/microservices";
import { NotificationDTO } from "./dto/notification.dto";

@Controller("notification")
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly notificationClient: ClientProxy
    ) {}

    @MessagePattern("new_comment")
    async handleNewComment(notification: NotificationDTO) {
        return await this.notificationService.handleNewComment(notification);
    }

    @Get(":userId")
    async getUserNotifications(@Param("userId") userId: string) {
        return await this.notificationService.getUserNotifications(userId);
    }
}