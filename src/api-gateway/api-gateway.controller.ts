import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Request, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Public } from "src/common/decorator/public.decorator";
import { LoginDTO } from "src/ms-auth/dto/login.dto";
import { CreateCommunityDTO } from "src/ms-community/dto/create-community.dto";
import { ApiGatewayService } from "./api-gateway.service";
import { CommunityRoleGuard } from "src/ms-community/guards/community-role.guard";
import { CreatePostDTO } from "src/ms-community/post/dto/create-post.dto";


@Controller("api")
export class ApiGatewayController {
    constructor (
        private readonly apiGatewayService: ApiGatewayService,
        @Inject("USER_SERVICE") private readonly userClient: ClientProxy,
        @Inject("COMMUNITY_SERVICE") private readonly communityClient: ClientProxy,
        @Inject("AUTH_SERVICE") private readonly authClient: ClientProxy,
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

    @Public()
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

    //#region Auth
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("auth/login")
    async login(@Body() loginData: LoginDTO) {
        return await this.apiGatewayService.login(loginData);
    }

    @Get("auth/profile")
    async getProfile(@Request() req) {
        return await this.authClient.send("get_profile", req);
    }
    //#endregion

    //#region Post
    @Post("community/post")
    @UseGuards(CommunityRoleGuard)
    async createPost(@Body() post: CreatePostDTO) {
        return await this.communityClient.send("create_post", post);
    }

    @Get("community/:id/posts")
    async getAllPostsFromCommunity(@Param("id") id: string) {
        return await this.communityClient.send("get_all_posts_from_community", id);
    }

    @Get()
    async getOnePostById() {

    }

    @Post()
    @UseGuards(CommunityRoleGuard)
    async updatePost() {

    }

    @Post()
    async deletePost() {
        
    }
    //#endregion
}