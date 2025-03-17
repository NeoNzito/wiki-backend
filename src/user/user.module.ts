import { Module } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [],
    controllers: [],
    providers: [UserRepository, UserService],
    exports: [UserService],
})
export class UserModule {}