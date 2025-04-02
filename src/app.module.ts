import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';


@Module({
  imports: [
    AuthModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
