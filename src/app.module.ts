import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './ms-user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommunityModule } from './ms-community/community.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    CommunityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
