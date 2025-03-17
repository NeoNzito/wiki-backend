import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() body: any) {
        const { username, email, password } = body
        const user : CreateUserDTO = {
            username,
            email,
            password
        }

        return await this.userService.create(user);
    }

    @Get()
    async get() {
        return "Oie!";
    }
}