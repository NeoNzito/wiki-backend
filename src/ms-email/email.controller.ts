import { Controller } from "@nestjs/common";
import { EmailService } from "./email.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller("email")
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @MessagePattern("send_verification_email")
    async handleVerificationEmail(data: { email: string; token: string }) {
        return await this.emailService.sendVerificationEmail(data.email, data.token);
    }
}