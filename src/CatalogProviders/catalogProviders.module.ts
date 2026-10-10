import { Module } from "@nestjs/common";
import { PrismaModule } from "../PrismaConection/prisma.module";
import { catalogProvidersService } from "./catalogProviders.service";
import { catalogProvidersController } from "./catalogProviders.controller";


@Module({
    imports: [PrismaModule],
    controllers: [catalogProvidersController],
    providers: [catalogProvidersService]
})
export class catalogProvidersModule { }