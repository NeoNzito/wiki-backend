import { Body, Controller, Get, Inject, Param, Post, Request } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { title } from "process";
import { Public } from "src/auth/decorator/public.decorator";
import { CreateCommunityDTO } from "src/ms-community/dto/create-community.dto";
import { UpdateCommunityDTO } from "src/ms-community/dto/update-community.dto";


@Controller("api")
export class ApiGatewayController {
    constructor (
        @Inject("USER_SERVICE") private readonly userClient: ClientProxy,
        @Inject("COMMUNITY_SERVICE") private readonly communityClient: ClientProxy,
    ) {}

    //#region User
    @Public()
    @Post("user")
    async createUser(@Body() createUserDTO: { username, email, password }) {
        return await this.userClient.send("create_user", createUserDTO);
    }

    @Get("user")
    async getUserByEmail(@Body() data: { email: string }) {
        return await this.userClient.send("get_user_by_email", data.email);
    }

    @Get("user/:id")
    async getOneUserById(@Param("id") id: string) {
        return await this.userClient.send("get_user_by_id", id);
    }

    @Post("user/edit/:id")
    async updateUser(@Param("id") id: string, @Body() user: { username: string, password: string }) {
        const data = {
            id,
            user
        }
        return await this.userClient.send("update_user", data);
    }

    @Post("user/delete/:id")
    async disableUser(@Param("id") id: string) {
        return await this.userClient.send("disable_user", id);
    }
    //#endregion

    //#region Community
    @Post("community")
    async createCommunity(@Request() req, @Body() data: { title, description }) {
        const community: CreateCommunityDTO = {
            ...data,
            ownerId: req.user.id
        }
        return await this.communityClient.send("create_community", community);
    }

    @Get("community")
    async getAllCommunities(@Body() data: { page: number, limit: number }) {
        return await this.communityClient.send("get_all_communities", data);
    }

    @Get("community/:id")
    async getOneCommunityById(@Param("id") id: string) {
        return await this.communityClient.send("get_one_community_by_id", id);
    }

    @Post("community/update/:id")
    async updateCommunity(@Param("id") id: string, @Body() community: { title: string, description: string }) {
        const data = {
            ...community,
            id
        }
        return this.communityClient.send("update_community", data);
    }

    @Post("community/delete/:id")
    async disableCommunity(@Param("id") id) {
        return this.communityClient.send("disable_community", id);
    }
    //#endregion
}