import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaModule } from "../PrismaConection/prisma.module";
import { PrismaService } from "../PrismaConection/prisma.service";
import { createProviderDto } from "./DTO/provider.dto";
import { slugify } from "../slugify";
import { S3Service } from "../S3Conection/S3.service";
import { nanoid } from 'nanoid';
import { Prisma } from "../generated/prisma/client";


@Injectable()
export class ProviderService {
    private readonly logger = new Logger(ProviderService.name)
    constructor(
        private readonly prisma: PrismaService,
        private readonly S3: S3Service
    ) { }

    async getAllCards() {
        return this.prisma.provider.findMany({
            
        })
    }

    async getIdProvider(id: number) {
        try {
            return this.prisma.provider.findUniqueOrThrow({
                where: { id, isDeleted: false },
                include: {
                    catalog: true
                }
            })
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
                throw new NotFoundException(`Поставщика с id: ${id} не найденно`)
            }
            throw err
        }
    }

    async createProviders(
        dto: createProviderDto,
        imageProviders: Express.Multer.File,
        logoSupplierCompany: Express.Multer.File,
        docOfTheHead: Express.Multer.File
    ) {
        const PathProviders = `${dto.name}-${nanoid(8)}`
        const files = {
            imageProviders,
            logoSupplierCompany,
            docOfTheHead
        }
        const entries = await Promise.all(
            Object.entries(files).map(async ([field, file]) => {
                if (!file) {
                    throw new BadRequestException(`Не были добавленны все обязательные файлы или ошибка при добавлении файла`)
                }

                const filename = `${nanoid(8)}-${slugify(file.originalname)}`
                const path = `${PathProviders}/${filename}`
                const url = await this.S3.uploadFile(file, path)

                return [field, url] as const
            })
        )
        return this.prisma.provider.create({
            data: {
                ...dto,
                supplierEvaluation: new Prisma.Decimal(dto.supplierEvaluation),
                ...Object.fromEntries(entries)
            }
        })
    }


    async deleteById(id: number) {
        const provider = await this.prisma.provider.findUnique({
            where: { id }
        })
        if (!provider) throw new NotFoundException(`Не найдено поставщика с id: ${id}`);
        if (provider.isDeleted) throw new BadRequestException(`Поствщик уже удален`);

        return this.prisma.provider.update({
            where: { id },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        })
    }
}
