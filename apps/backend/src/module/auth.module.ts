import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@/controllers';
import { PrismaModule } from '@/module';
import { AuthService } from '@/service';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: process.env.ACCESS_TOKEN_SECRET!,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
