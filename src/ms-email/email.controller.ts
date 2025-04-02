import { Controller } from "@nestjs/common";
import { EmailService } from "./email.service";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";

@Controller("email")
export class EmailController {
    constructor(
        private readonly emailService: EmailService,
    ) {}

    @EventPattern("user.created")
    async handleVerificationEmail(@Payload() data: { email: string; token: string }, @Ctx() context: RmqContext) {
        const req = await this.emailService.sendVerificationEmail(data.email, data.token);
        
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);

        return req;
    }
}