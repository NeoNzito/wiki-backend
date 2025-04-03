import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "./dto/login.dto";
import { firstValueFrom } from "rxjs";
import UserEntity from "src/ms-user/entity/user.entity";


const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService : JwtService
    ) {}

    async login(user: UserEntity, loginData: LoginDTO): Promise<{ access_token: string }> {
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