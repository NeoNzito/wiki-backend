import { Module } from "@nestjs/common";
import { CommunityController } from "./comumunity.controller";
import { CommunityService } from "./community.service";
import { CommunityRepository } from "./repository/community.repository";
import { PostModule } from "./post/post.module";
import { CommunityRoleGuard } from "../api-gateway/guards/community-role.guard";
import { APP_GUARD } from "@nestjs/core";
import { CommunityGateway } from "./community.gateway";

@Module({
    imports: [PostModule],
    controllers: [CommunityController],
    providers: [
        CommunityService, 
        CommunityRepository,
        CommunityGateway,
        {
            provide: APP_GUARD,
            useClass: CommunityRoleGuard
        }
    ],
    exports: [CommunityService]
})
export class CommunityModule {}