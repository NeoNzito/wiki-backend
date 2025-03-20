import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { jwtConstants } from "./jwt/constants";


@Module({
 imports: [
    UserModule,
    JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {
            expiresIn: jwtConstants.accessExpiresIn
        },
    })
 ],
 providers: [],
 exports: []
})
export class AuthModule {}