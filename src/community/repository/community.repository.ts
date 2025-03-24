import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCommunityDTO } from "../dto/create-community.dto";

@Injectable()
export class CommunityRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createCommunity({ title, description, ownerId }: CreateCommunityDTO) {
        return await this.prisma.community.create({
            data: {
                title: title,
                description: description,
                ownerId: ownerId,
            }
        })
    }

    async getAllCommunities(page: number = 1, limit: number = 20) {
        const skip = (page - 1) * limit;

        const communities = await this.prisma.community.findMany({
            skip: skip,
            take: limit
        });

        const total = await this.prisma.community.count();

        return {
            data: communities,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        }
    }
}