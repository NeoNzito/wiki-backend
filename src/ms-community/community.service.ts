import { Injectable } from "@nestjs/common";
import { CommunityRepository } from "./repository/community.repository";
import { CreateCommunityDTO } from "./dto/create-community.dto";
import { UpdateCommunityDTO } from "./dto/update-community.dto";

@Injectable()
export class CommunityService {
    constructor(private readonly communityRepository: CommunityRepository) {}

    async createCommunity(community: CreateCommunityDTO) {
        try {
            return await this.communityRepository.createCommunity(community);
        }
        catch(e) {
            console.log(e);
            return
        }
    }

    async getAllCommunities(page: number = 1, limit: number = 20) {
        return await this.communityRepository.getAllCommunities(page, limit);
    }

    async getOneCommunityById(id: string) {
        return await this.communityRepository.getOneCommunityById(id);
    }

    async updateCommunity(id: string, community: UpdateCommunityDTO) {
        return await this.communityRepository.updateCommunity(id, community);
    }

    async disableCommunity(id: string) {
        return await this.communityRepository.disableCommunity(id);
    }
}