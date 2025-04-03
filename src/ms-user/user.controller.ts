import { Body, Controller, Inject } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { ClientProxy, MessagePattern, Payload } from "@nestjs/microservices";


@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        @Inject("USER_SERVICE") private readonly userClient: ClientProxy
    ) {}

    @MessagePattern("create_user")
    async createUser(@Payload() user: CreateUserDTO) {
        const res = await this.userService.createUser(user);
        this.userClient.emit("user.created", res);
        return { message: "User created succesfully" };
    }

    @MessagePattern("get_user_by_email")
    async getUserByEmail(@Payload() email: string) {
        return await this.userService.getOneUserByEmail(email);
    }

    @MessagePattern("get_user_by_id")
    async getOneUserById(@Payload() id: string) {
        return await this.userService.getOneUserById(id);
    }

    @MessagePattern("update_user")
    async updateUser(@Payload() data: { id: string, user: UpdateUserDTO }) {
        return await this.userService.updateUser(data.id, data.user);
    }

    @MessagePattern("disable_user")
    async disableUser(@Payload() id: string) {
        return await this.userService.disableUser(id);
    }
}