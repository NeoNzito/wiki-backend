import { Body, Controller, Get, Param, Post, Request, UnauthorizedException } from "@nestjs/common";
import { CreateCommunityDTO } from "./dto/create-community.dto";
import { CommunityService } from "./community.service";
import { UpdateCommunityDTO } from "./dto/update-community.dto";

@Controller("community")
export class CommunityController {
    constructor (private readonly communityService : CommunityService) {}

    @Post()
    async createCommunity(@Request() req, @Body() body) {
        const { title, description } = body;
        const community : CreateCommunityDTO = {
            title,
            description,
            ownerId: req.user.id
        }

        return await this.communityService.createCommunity(community);
    }

    @Get()
    async getAllCommunities(@Body() body) {
        const { page, limit } = body;
        return await this.communityService.getAllCommunities(page, limit);
    }

    @Get("/:id")
    async getOneCommunityById(@Param("id") id: string) {
        return this.communityService.getOneCommunityById(id);
    }

    @Post("/update/:id")
    async updateCommunity(@Param("id") id: string, @Body() body) {
        const { title, description } = body;
        const community : UpdateCommunityDTO = {
            title,
            description
        }

        return this.communityService.updateCommunity(id, community);
    }

    @Post("/delete/:id")
    async disableCommunity(@Param("id") id) {
        return this.communityService.disableCommunity(id);
    }
}