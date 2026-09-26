import { Injectable } from "@nestjs/common";
import { PrismaModule } from "../PrismaConection/prisma.module";
import { PrismaService } from "../PrismaConection/prisma.service";


@Injectable()
export class ProviderService{
    constructor(
        private readonly prisma: PrismaService
    ) {}
}
