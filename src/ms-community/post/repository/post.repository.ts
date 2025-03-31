import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostRepository {
    constructor(
        private readonly prisma : PrismaService
    ) {}

    async createPost() {
        
    }

    async getPostsFromCommunity(communityId: string) {
        return await this.prisma.post.findMany({
            where: {
                communityId: communityId
            }
        });
    }
}