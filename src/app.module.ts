import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommunityModule } from './community/community.module';

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
