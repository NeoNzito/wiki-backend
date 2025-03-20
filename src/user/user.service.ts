import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { CreateUserDTO } from "./dto/create-user.dto";


const bcrypt = require("bcrypt");

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(user: CreateUserDTO) {
        try {

            const hashedPassword = await bcrypt.hash(user.password, 10)
            user.password = hashedPassword;
            return await this.userRepository.create(user);
            
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    async getOneById(id: string) {
        return await this.userRepository.getOneById(id);
    }

    async getOneByEmail(email: string) {
        return await this.userRepository.getOneByEmail(email);
    }

    async disableUser(id:string) {
        return await this.userRepository.disableUser(id);
    }
}