import { NotificationType } from "@prisma/client";

export class NotificationDTO {
    userId: string;
    type: NotificationType;
    message: string;
}