import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from "@nestjs/common";
import { Public } from "./decorator/public.decorator";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";


@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    async login(@Body() loginData : LoginDTO) {
        return await this.authService.login(loginData);
    }

    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }
}