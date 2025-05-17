import { Module } from '@nestjs/common';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule, FriendModule } from '@/module';
import { PrismaService } from '@/service';

@Module({
    imports: [AuthModule, FriendModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
    exports: [PrismaService],
})
export class AppModule {}
