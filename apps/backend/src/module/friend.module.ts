import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '@/module/prisma.module';

import { FriendController } from '../controllers';
import { FriendService } from '../service';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: process.env.ACCESS_TOKEN_SECRET!,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [FriendController],
    providers: [FriendService],
})
export class FriendModule {}
