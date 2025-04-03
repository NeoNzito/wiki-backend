import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { LoginDTO } from "src/ms-auth/dto/login.dto";

@Injectable()
export class ApiGatewayService {
    constructor(
        @Inject("USER_SERVICE") private readonly userClient: ClientProxy,
        @Inject("AUTH_SERVICE") private readonly authClient: ClientProxy
    ) {}

    async login(loginData: LoginDTO) {
        const user = await firstValueFrom(
            this.userClient.send("get_user_by_email", { email: loginData.email })
        )

        return await this.authClient.send("login", { user: user, loginData: loginData })
    }
}