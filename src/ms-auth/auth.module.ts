import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./jwt/constants";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";


@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: jwtConstants.accessExpiresIn
            },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
    ],
    exports: [AuthService]
})
export class AuthModule {}