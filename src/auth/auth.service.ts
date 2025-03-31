import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/ms-user/user.service";
import { LoginDTO } from "./dto/login.dto";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";


const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
    constructor(
        @Inject("USER_SERVICE") private userClient : ClientProxy,
        private jwtService : JwtService
    ) {}

    async login(loginData: LoginDTO): Promise<{ access_token: string }> {
        const user = await firstValueFrom(
            this.userClient.send("get_user_by_email", { email: loginData.email })
        );
        
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