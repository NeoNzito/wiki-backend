import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";


const bcrypt = require("bcrypt");

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(user: CreateUserDTO) {
        try {

            const hashedPassword = await bcrypt.hash(user.password, 10)
            user.password = hashedPassword;
            return await this.userRepository.createUser(user);
            
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    async getOneUserById(id: string) {
        return await this.userRepository.getOneUserById(id);
    }

    async getOneUserByEmail(email: string) {
        return await this.userRepository.getOneUserByEmail(email);
    }

    async updateUser(id: string, user: UpdateUserDTO) {
        return await this.userRepository.updateUser(id, user);
    }

    async disableUser(id:string) {
        return await this.userRepository.disableUser(id);
    }
}