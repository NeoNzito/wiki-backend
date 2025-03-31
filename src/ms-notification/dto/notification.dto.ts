enum NotificationType {
    Comment
}

export class NotificationDTO {
    type: NotificationType;
    message: string;
    userId: string;
}