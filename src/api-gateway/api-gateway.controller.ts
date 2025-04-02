import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Public } from "src/auth/decorator/public.decorator";
import { CreateUserDTO } from "src/ms-user/dto/create-user.dto";

@Controller("api")
export class ApiGatewayController {
    constructor (
        @Inject("USER_SERVICE") private readonly userClient: ClientProxy,
        @Inject("COMMUNITY_SERVICE") private readonly communityClient: ClientProxy,
    ) {}

    @Public()
    @Post("user")
    async createUser(@Body() createUserDTO: { username, email, password }) {
        return await this.userClient.send("create_user", createUserDTO);
    }
}