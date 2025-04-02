import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostRepository } from "./repository/post.repository";

@Module({
    controllers: [],
    providers: [
        PostService,
        PostRepository,
    ],
    exports: [
        PostService
    ]
})
export class PostModule {}