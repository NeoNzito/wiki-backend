import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDTO } from "../dto/create-post.dto";
import { UpdatePostDTO } from "../dto/update-post.dto";

@Injectable()
export class PostRepository {
    constructor(
        private readonly prisma : PrismaService
    ) {}

    async createPost(post: CreatePostDTO) {
        return await this.prisma.post.create({
            data: {
                communityId: post.communityId,
                creatorId: post.ownerId,
                content: post.content
            }
        });
    }

    async getAllPostsFromCommunity(communityId: string) {
        return await this.prisma.post.findMany({
            where: {
                communityId: communityId
            }
        });
    }

    async getOnePostById(id: string) {
        return await this.prisma.post.findFirst({
            where: {
                id: id
            }
        });
    }

    async updatePost(id: string, post: UpdatePostDTO) {
        return await this.prisma.post.update({
            where: {
                id: id
            },
            data: {
                ...post
            }
        })
    }

    async deletePost(id: string) {
        return await this.prisma.post.delete({
            where: {
                id: id
            }
        })
    }
}