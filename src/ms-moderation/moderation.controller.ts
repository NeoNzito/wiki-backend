import { Controller } from "@nestjs/common";
import { ModerationService } from "./moderation.service";
import { ClientProxy, MessagePattern } from "@nestjs/microservices";

@Controller("moderation")
export class ModerationController {
    constructor(
        private readonly moderationService: ModerationService,
    ) {}

    @MessagePattern("moderate_text")
    async moderateText(data: { content: string }) {
        return await this.moderationService.moderateText(data.content);
    }
}