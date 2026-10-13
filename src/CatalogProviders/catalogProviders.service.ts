import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../PrismaConection/prisma.service";
import { S3Service } from "../S3Conection/S3.service";
import { Prisma, Unit } from "../generated/prisma/client";
import { CreateCatalogProviders } from './DTO/catalogProviders.dto'


@Injectable()
export class catalogProvidersService {
    private readonly logger = new Logger(catalogProvidersService.name)
    constructor(
        private readonly prisma: PrismaService,
        private readonly s3: S3Service
    ) { }

    async getAllCatalog() {
        return this.prisma.catalogProviders.findMany()
    }

    async getIdCatalog(id: number) {
        try {
            return await this.prisma.catalogProviders.findUnique({ where: { id } })
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
                throw new NotFoundException(`Каталога поставщика с id: ${id} не найден`)
            }
            throw err
        }
    }


    async createCatalog(dto: CreateCatalogProviders, id: number) {
        try {
            const provider = await this.prisma.provider.findUnique({ where: { id } })
            if (!provider) {
                throw new NotFoundException(`Поставщик с id: ${id} не найден`)
            }
            return this.prisma.catalogProviders.create({
                data: {
                    ...dto,
                    unitOfMeasurement: dto.unitOfMeasurement as Unit,
                    providerId: id
                }
            })
        } catch (err) {
            if (err instanceof NotFoundException) {
                throw err
            }

            this.logger.log(`Ошибка при создании каталога:`, err)
            throw new InternalServerErrorException(`Неизвестная ошибка`)
        }
    }

    async patchCatalog(dto: CreateCatalogProviders, id: number) {
        try {
            return this.prisma.catalogProviders.update({
                where: { id },
                data: {
                    ...dto
                }
            })
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
                throw new NotFoundException(`Каталог с id: ${id} не найден`)
            }
            throw err
        }
    }

    async deleteById(id: number) {
        const catalog = await this.prisma.catalogProviders.findUnique({
            where: { id }
        })

        if (!catalog) {
            throw new NotFoundException(`Каталога поставщика с ID: ${id} не найденно`)
        }
        return this.prisma.catalogProviders.delete({
            where: { id }
        })
    }
}