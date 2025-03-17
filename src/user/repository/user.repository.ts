import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import UserEntity from "../entity/user.entity";


@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(user: UserEntity) {
        const { username, email, password } = user;

        return await this.prisma.user.create({
            data: {
                email,
                username,
                password
            }
        })
    }
}