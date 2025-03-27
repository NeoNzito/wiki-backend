import { Controller } from "@nestjs/common";
import { ModerationService } from "./moderation.service";

@Controller("moderation")
export class ModerationController {
    constructor(private readonly moderationService: ModerationService) {}

    
}