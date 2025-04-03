import { Body, Controller, Get, Inject, Param, Post, Request, UnauthorizedException } from "@nestjs/common";
import { CreateCommunityDTO } from "./dto/create-community.dto";
import { CommunityService } from "./community.service";
import { UpdateCommunityDTO } from "./dto/update-community.dto";
import { ClientProxy, MessagePattern, Payload } from "@nestjs/microservices";

@Controller("community")
export class CommunityController {
    constructor(
        private readonly communityService: CommunityService,
        @Inject("COMMUNITY_SERVICE") private readonly communityClient: ClientProxy
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
        return this.communityService.getOneCommunityById(id);
    }

    @MessagePattern("update_community")
    async updateCommunity(@Payload() data: { id: string, community: UpdateCommunityDTO }) {
        return this.communityService.updateCommunity(data.id, data.community);
    }

    @MessagePattern("disable_community")
    async disableCommunity(@Payload() id: string) {
        return this.communityService.disableCommunity(id);
    }
}