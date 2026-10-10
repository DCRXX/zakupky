import { Module } from "@nestjs/common";
import { PrismaModule } from "../PrismaConection/prisma.module";
import { DetailedInformationController } from "./DetailedInformation.controller";
import { DetailedInformationService } from "./DetailedInformation.service";


@Module({
    imports: [PrismaModule],
    controllers: [DetailedInformationController],
    providers: [DetailedInformationService]
})
export class DetailedInformationModule { }