import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "./PrismaConection/prisma.service";
import { S3Service } from "./S3Conection/S3.service";
import { Cron, CronExpression } from '@nestjs/schedule'
import { error } from "console";


@Injectable()
export class CleanUpService {
    private readonly logger = new Logger(CleanUpService.name)

    constructor(
        private readonly prisma: PrismaService,
        private readonly s3: S3Service
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async cleanUpDeletedProviders() {
        const deletedProviders = await this.prisma.provider.findMany({
            where: { isDeleted: true },
            select: { id: true, imageProviders: true, logoSupplierCompany: true, docOfTheHead: true },
        })

        let successCount = 0
        let errorCount = 0

        for (const provider of deletedProviders) {
            if (deletedProviders.length === 0) {
                return
            }
            this.logger.log(`Найдено ${deletedProviders.length} поставщиков для удаления`)
            try {
                if (provider.imageProviders) await this.s3.deleteFile(provider.imageProviders);
                if (provider.logoSupplierCompany) await this.s3.deleteFile(provider.logoSupplierCompany);
                if (provider.docOfTheHead) await this.s3.deleteFile(provider.docOfTheHead);

                await this.prisma.provider.delete({ where: { id: provider.id } })
                successCount++
            } catch (error: any) {
                errorCount++
                this.logger.error(`Не удалось удалить провайдера с ID: ${provider.id}. Ошибка: ${error.message}`, error.stack)
            }
        }
        this.logger.log(`Успешно удаллено ${successCount} Поставщиков. Ошибок в удалении ${errorCount}`)
    }
}