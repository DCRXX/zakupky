import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './PrismaConection/prisma.module';
import { ProviderModule } from './provider/provider.module';
import { S3Module } from './S3Conection/S3.module';
import { catalogProvidersModule } from './CatalogProviders/catalogProviders.module';
import { DetailedInformationModule } from './DetailedInformation/DetailedInformation.module';
import { CleanUpService } from './Cleanup.service';
import { ScheduleModule } from '@nestjs/schedule';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: process.env.ObserveApiKey!,
      appSecret: process.env.ObserveAppSecret!,
      serviceId: 'zakupky',
    }),
    ScheduleModule.forRoot(),
    PrismaModule, S3Module, ProviderModule, catalogProvidersModule, DetailedInformationModule
  ],
  controllers: [AppController],
  providers: [AppService, CleanUpService],
})
export class AppModule {}
