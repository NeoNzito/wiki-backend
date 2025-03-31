import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/ms-user/user.module";
import { jwtConstants } from "./jwt/constants";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./jwt/guard/auth.guard";
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: jwtConstants.accessExpiresIn
            },
        }),
        ClientsModule.register([
            {
                name: "USER_SERVICE",
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
                    queue: "user_queue",
                    queueOptions: { durable: false },
                },
            },
        ])
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