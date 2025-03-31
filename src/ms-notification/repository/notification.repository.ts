import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { NotificationDTO } from "../dto/notification.dto";

@Injectable()
export class NotificationRepository {
    constructor(
        private readonly prisma : PrismaService
    ) {}

    async createNotification(notification: NotificationDTO) {
        const { message, type, userId } = notification;
        return await this.prisma.notification.create({
            data: {
                userId: userId,
                type: type,
                message: message,
            }
        });
    }

    async getUserNotifications(userId) {
        return await this.prisma.notification.findMany({
            where: {
                userId: userId
            }
        });
    }
}