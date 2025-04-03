import { Injectable } from "@nestjs/common";
import { PostRepository } from "./repository/post.repository";
import { CreatePostDTO } from "./dto/create-post.dto";
import { UpdatePostDTO } from "./dto/update-post.dto";

@Injectable()
export class PostService {
    constructor(
        private readonly postRepository : PostRepository
    ) {}

    async createPost(post: CreatePostDTO) {
        return await this.postRepository.createPost(post);
    }

    async getAllPostsFromCommunity(communityId: string) {
        return await this.postRepository.getAllPostsFromCommunity(communityId);
    }

    async getOnePostById(postId: string) {
        return await this.postRepository.getOnePostById(postId);
    }

    async updatePost(postId: string, post: UpdatePostDTO) {
        return await this.postRepository.updatePost(postId, post);
    }

    async deletePost(postId:string) {
        return await this.postRepository.deletePost(postId);
    }
}