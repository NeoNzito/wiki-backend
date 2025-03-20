import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { LoginDTO } from "./dto/login.dto";


const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private jwtService : JwtService
    ) {}

    async login(loginData: LoginDTO): Promise<{ access_token: string }> {
        const user = await this.userService.getOneByEmail(loginData.email);
        if (!user) {
            throw new UnauthorizedException();
        }

        if (!bcrypt.compare(loginData.password, user.password)) {
            throw new UnauthorizedException();
        }

        const payload = { user: { id: user.id, username:user.username, email: user.email } };    
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}