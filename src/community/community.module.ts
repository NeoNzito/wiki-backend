import { Module } from "@nestjs/common";
import { CommunityController } from "./comumunity.controller";
import { CommunityService } from "./community.service";
import { CommunityRepository } from "./repository/community.repository";

@Module({
    controllers: [CommunityController],
    providers: [
        CommunityService, 
        CommunityRepository
    ],
    exports: [CommunityService]
})
export class CommunityModule {}