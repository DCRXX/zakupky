import { Module } from "@nestjs/common";
import { PrismaModule } from "../PrismaConection/prisma.module";


@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: []
}) export class ProviderModule { }