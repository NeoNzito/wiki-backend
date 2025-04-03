import { Module } from "@nestjs/common";
import { CommunityController } from "./comumunity.controller";
import { CommunityService } from "./community.service";
import { CommunityRepository } from "./repository/community.repository";
import { PostModule } from "./post/post.module";

@Module({
    imports: [PostModule],
    controllers: [CommunityController],
    providers: [
        CommunityService, 
        CommunityRepository
    ],
    exports: [CommunityService]
})
export class CommunityModule {}