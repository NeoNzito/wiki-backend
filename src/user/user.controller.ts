import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Public } from "src/auth/decorator/public.decorator";


@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @Public()
    async create(@Body() body: any) {
        const { username, email, password } = body
        const user : CreateUserDTO = {
            username,
            email,
            password
        }

        return await this.userService.create(user);
    }

    @Get("/:id")
    @Public()
    async getOneById(@Param("id") id: string) {
        return await this.userService.getOneById(id);
    }

    @Get("/auth/:email")
    @Public()
    async getOneByEmail(@Param("email") email: string) {
        return await this.userService.getOneByEmail(email);
    }

    @Post("/auth/:id")
    async disableUser(@Param("id") id: string) {
        return await this.userService.disableUser(id);
    }
}