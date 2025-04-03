import { Controller } from "@nestjs/common";
import { CreateCommunityDTO } from "./dto/create-community.dto";
import { CommunityService } from "./community.service";
import { UpdateCommunityDTO } from "./dto/update-community.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PostService } from "./post/post.service";
import { CreatePostDTO } from "./post/dto/create-post.dto";
import { UpdatePostDTO } from "./post/dto/update-post.dto";

@Controller("community")
export class CommunityController {
    constructor(
        private readonly communityService: CommunityService,
        private readonly postService: PostService,
    ) {}

    @MessagePattern("create_community")
    async createCommunity(@Payload() community: CreateCommunityDTO) {
        return await this.communityService.createCommunity(community);
    }

    @MessagePattern("get_all_communities")
    async getAllCommunities(@Payload() data: { page: number, limit: number }) {
        return await this.communityService.getAllCommunities(data.page, data.limit);
    }

    @MessagePattern("get_one_community_by_id")
    async getOneCommunityById(@Payload() id: string) {
        return await this.communityService.getOneCommunityById(id);
    }

    @MessagePattern("update_community")
    async updateCommunity(@Payload() data: { id: string, community: UpdateCommunityDTO }) {
        return await this.communityService.updateCommunity(data.id, data.community);
    }

    @MessagePattern("disable_community")
    async disableCommunity(@Payload() id: string) {
        return await this.communityService.disableCommunity(id);
    }

    @MessagePattern("create_post")
    async createPost(@Payload() post: CreatePostDTO) {
        return await this.postService.createPost(post);
    }

    @MessagePattern("get_all_posts_from_community")
    async getAllPostsFromCommunity(@Payload() communityId: string) {
        return await this.postService.getAllPostsFromCommunity(communityId);
    }

    @MessagePattern("get_one_post_by_id")
    async getOnePostById(@Payload() postId: string) {
        return await this.postService.getOnePostById(postId);
    }

    @MessagePattern("update_post")
    async updatePost(@Payload() data: { postId: string, post: UpdatePostDTO }) {
        return await this.postService.updatePost(data.postId, data.post);
    }

    @MessagePattern("delete_post")
    async deletePost(@Payload() postId) {
        return await this.postService.deletePost(postId);
    }
}