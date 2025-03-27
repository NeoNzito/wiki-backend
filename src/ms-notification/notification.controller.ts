import { Controller } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { ClientProxy } from "@nestjs/microservices";

@Controller("controller")
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly notificationClient: ClientProxy
    ) {}
}