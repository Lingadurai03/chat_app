import { Module } from '@nestjs/common';

import { AuthController } from '@/controllers';
import { PrismaModule } from '@/module';
import { AuthService } from '@/service';

@Module({
    imports: [PrismaModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
