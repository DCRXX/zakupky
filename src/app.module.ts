import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './PrismaConection/prisma.module';
import { ProviderModule } from './provider/provider.module';
import { S3Module } from './S3Conection/S3.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: process.env.ObserveApiKey!,
      appSecret: process.env.ObserveAppSecret!,
      serviceId: 'zakupky',
    }),
    PrismaModule, S3Module, ProviderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
