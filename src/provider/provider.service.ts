import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaModule } from "../PrismaConection/prisma.module";
import { PrismaService } from "../PrismaConection/prisma.service";
import { createProviderDto } from "./DTO/provider.dto";
import { slugify } from "../slugify";
import { S3Service } from "../S3Conection/S3.service";
import { nanoid } from 'nanoid';
import { format } from 'date-fns';


@Injectable()
export class ProviderService {
    private readonly logger = new Logger(ProviderService.name)
    constructor(
        private readonly prisma: PrismaService,
        private readonly S3: S3Service
    ) { }

    async getAll() {
        return this.prisma.provider.findMany()
    }

    async createProviders(
        dto: createProviderDto,
        ImageProviders: Express.Multer.File,
        LogoSupplierCompany: Express.Multer.File,
        DocOfTheHead: Express.Multer.File
    ) {
        const PathProviders = `${dto.Name}-${nanoid(8)}`
        const files = {
            ImageProviders,
            LogoSupplierCompany,
            DocOfTheHead
        }
        const entries = await Promise.all(
            Object.entries(files).map(async ([field, file]) => {
                if (!file) return [field, ''] as const

                const filename = `${nanoid(8)}-${slugify(file.originalname)}`
                const path = `${PathProviders}/${filename}`
                const url = await this.S3.uploadFile(file, path)

                return [field, url] as const
            })
        )

        return this.prisma.provider.create({
            data: {
                ...dto,
                ...Object.fromEntries(entries)
            }
        })
    }

    async deleteAll() {
        const providers = await this.prisma.provider.findMany({
            where: {
                OR: [
                    { ImageProviders: { not: '' } },
                    { LogoSupplierCompany: { not: '' } },
                    { DocOfTheHead: { not: '' } }
                ]
            }
        })

        await Promise.allSettled(
            providers.flatMap((adv) => [
                ...(adv.ImageProviders ? [this.S3.deleteFile(adv.ImageProviders).catch(err =>
                    this.logger.error(`Ошибка удаления Фото Руковадителя у ${adv.Name} (${adv.id})`, err),
                )] : []),
                ...(adv.LogoSupplierCompany ? [this.S3.deleteFile(adv.LogoSupplierCompany).catch(err =>
                    this.logger.error(`Ошибка удаления Лого компании поставщика у ${adv.Name} (${adv.id})`, err),
                )] : []),
                ...(adv.DocOfTheHead ? [this.S3.deleteFile(adv.DocOfTheHead).catch(err =>
                    this.logger.error(`Ошибка удаления Документ подтверждающий полномочия руководителя у ${adv.Name} (${adv.id})`, err)
                )] : [])
            ])
        )



        return this.prisma.provider.deleteMany()
    }


    async deleteById(id: number) {
        const provider = await this.prisma.provider.findUnique({
            where: { id }
        })
        if (!provider) {
            throw new NotFoundException(`Не найдено поставщика с id: ${id}`)
        }

        await Promise.allSettled(
            [
                ...(provider.ImageProviders ? [this.S3.deleteFile(provider.ImageProviders).catch(err =>
                    this.logger.error(`Ошибка удаления Фото Руковадителя у ${provider.Name} (${provider.id})`, err),
                )] : []),
                ...(provider.LogoSupplierCompany ? [this.S3.deleteFile(provider.LogoSupplierCompany).catch(err =>
                    this.logger.error(`Ошибка удаления Лого компании поставщика у ${provider.Name} (${provider.id})`, err),
                )] : []),
                ...(provider.DocOfTheHead ? [this.S3.deleteFile(provider.DocOfTheHead).catch(err =>
                    this.logger.error(`Ошибка удаления Документ подтверждающий полномочия руководителя у ${provider.Name} (${provider.id})`, err),
                )] : [])
            ]
        )

        return this.prisma.provider.delete({ where: { id } })
    }
}
