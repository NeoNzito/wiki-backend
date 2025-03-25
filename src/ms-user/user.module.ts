import { Module } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserRepository, UserService],
    exports: [UserService],
})
export class UserModule {}