import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Public } from "src/auth/decorator/public.decorator";
import { EditUserDTO } from "./dto/edit-user.dto";


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

    @Post("/edit/:id")
    async editUser(@Param("id") id: string, @Body() body : any) {
        const { username, password } = body
        const user : EditUserDTO = {
            username,
            password
        }
        return await this.userService.edit(id, user);
    }

    @Post("/auth/:id")
    async disableUser(@Param("id") id: string) {
        return await this.userService.disableUser(id);
    }
}