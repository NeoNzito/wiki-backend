import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Public } from "src/auth/decorator/public.decorator";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { ClientProxy } from "@nestjs/microservices";


@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly userClient: ClientProxy
    ) {}

    @Post()
    @Public()
    async createUser(@Body() body: any) {
        const { username, email, password } = body
        const user : CreateUserDTO = {
            username,
            email,
            password
        }

        const res = await this.userService.createUser(user);
        this.userClient.emit("user.created", res);
        return { message: "User created succesfully" };
    }

    @Get("/:id")
    @Public()
    async getOneUserById(@Param("id") id: string) {
        return await this.userService.getOneUserById(id);
    }

    @Post("/edit/:id")
    async editUser(@Param("id") id: string, @Body() body : any) {
        const { username, password } = body
        const user : UpdateUserDTO = {
            username,
            password
        }
        return await this.userService.updateUser(id, user);
    }

    @Post("/delete/:id")
    async disableUser(@Param("id") id: string) {
        return await this.userService.disableUser(id);
    }
}