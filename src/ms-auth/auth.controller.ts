import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MessagePattern, Payload } from "@nestjs/microservices";


@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @MessagePattern("login")
    async login(@Payload() data: { user, loginData }) {
        return await this.authService.login(data.user, data.loginData);
    }

    @Get("profile")
    getProfile(@Payload() req) {
        return req.user;
    }
}