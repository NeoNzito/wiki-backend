import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import UserEntity from "../entity/user.entity";
import { EditUserDTO } from "../dto/edit-user.dto";


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
        });
    }

    async getOneById(id: string) {
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

    async getOneByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }

    async edit(id: string, user: EditUserDTO) {
        
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