import { Controller } from "@nestjs/common";
import { EmailService } from "./email.service";
import { ClientProxy, EventPattern, Payload } from "@nestjs/microservices";

@Controller("email")
export class EmailController {
    constructor(
        private readonly emailService: EmailService,
        private readonly emailClient: ClientProxy
    ) {}

    @EventPattern("user.created")
    async handleVerificationEmail(@Payload() data: { email: string; token: string }) {
        return await this.emailService.sendVerificationEmail(data.email, data.token);
    }
}