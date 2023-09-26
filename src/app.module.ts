import { ClassSerializerInterceptor, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaHelper } from './helpers/prisma.helper';
import { LogRepository } from './repositories/prisma/log.repository';
import { WSController } from './controllers/ws.controller';
import { CreateLogService } from './services/create-log.service';
import { HTTPController } from './controllers/http.controller';
import { IpGuard } from './guards/ip.guard';
import { IPRepository } from './repositories/prisma/ip.repository';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { ThrottlerModule } from '@nestjs/throttler';

@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    ConfigModule.forRoot(),],
  controllers: [HTTPController],
  providers: [
    WSController,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },    
    {
      provide: APP_GUARD,
      useClass: IpGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: "IP",
      useClass: IPRepository
    },
    {
      provide: "Log",
      useClass: LogRepository,
    },
    CreateLogService,
    PrismaHelper
  ],
  exports: [
    PrismaHelper,
    CreateLogService
  ]
})
export class AppModule {}
