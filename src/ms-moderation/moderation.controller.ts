import { Controller } from "@nestjs/common";
import { ModerationService } from "./moderation.service";
import { ClientProxy } from "@nestjs/microservices";

@Controller("moderation")
export class ModerationController {
    constructor(
        private readonly moderationService: ModerationService,
        private readonly moderationClient: ClientProxy
    ) {}

    
}