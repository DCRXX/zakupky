import { Module } from "@nestjs/common";
import { PrismaModule } from "../PrismaConection/prisma.module";
import { ProviderController } from "./provider.controller";
import { ProviderService } from "./provider.service";


@Module({
    imports: [PrismaModule],
    controllers: [ProviderController],
    providers: [ProviderService]
}) export class ProviderModule { }