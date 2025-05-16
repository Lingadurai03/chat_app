import { Module } from '@nestjs/common';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { PrismaService } from '@/service';

import { AuthModule } from './module/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
    exports: [PrismaService],
})
export class AppModule {}
