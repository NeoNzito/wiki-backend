import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import UserEntity from "../entity/user.entity";
import { UpdateUserDTO } from "../dto/update-user.dto";


@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(user: UserEntity) {
        const { username, email, password } = user;

        return await this.prisma.user.create({
            data: {
                email,
                username,
                password
            }
        });
    }

    async getOneUserById(id: string) {
        return await this.prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                username: true
            }
        });
    }

    async getOneUserByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }

    async updateUser(id: string, user: UpdateUserDTO) {
        return await this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...user
            }
        })
    }

    async disableUser(id: string) {
        return await this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                active: false
            }
        })
    }
}