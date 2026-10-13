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
            include: {
                catalog: {
                    include: {
                        detailedInformation: {
                            select: { imageProduct: true }
                        }
                    }
                }
            }
        })

        if (deletedProviders.length === 0) {
            return
        }
        this.logger.log(`Найдено ${deletedProviders.length} поставщиков для удаления`)

        let successCount = 0
        let errorCount = 0

        for (const provider of deletedProviders) {
            try {
                const filesToDelete = this.extractFilePaths(provider)

                if(filesToDelete.length > 0){
                    Promise.allSettled(
                        filesToDelete.map(filePath => this.s3.deleteFile(filePath))
                    )
                }

                await this.prisma.provider.delete({ where: { id: provider.id } })
                successCount++
            } catch (error: any) {
                errorCount++
                this.logger.error(`Не удалось удалить провайдера с ID: ${provider.id}. Ошибка: ${error.message}`, error.stack)
            }
        }
        this.logger.log(`Успешно удаллено ${successCount} Поставщиков. Ошибок в удалении ${errorCount}`)
    }

    private extractFilePaths(obj: any): string[]{
        const paths: string[] = []

        const traverse = (current: any) => {
            if(typeof current === 'string' && current.trim().length > 0){
                if(current.includes('/') || current.startsWith('http')){
                    paths.push(current)
                }
            } else if(current && typeof current === 'object'){
                Object.values(current).forEach(traverse)
            }
        }

        traverse(obj)  

        return [...new Set(paths)]
    }
}