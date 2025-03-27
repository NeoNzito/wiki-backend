import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './ms-user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommunityModule } from './ms-community/community.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    CommunityModule,
    ClientsModule.register([
      {
        name: "EMAIL_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"],
          queue: "email_queue",
          queueOptions: { durable: false },
        }
      },
      {
        name: "MODERATION_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"],
          queue: "moderation_queue",
          queueOptions: { durable: false }
        }
      },
      {
        name: "NOTIFICATION_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"],
          queue: "notification_queue",
          queueOptions: { durable: false }
       }
      },
    ]),
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
