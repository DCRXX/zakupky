import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../PrismaConection/prisma.service";
import { S3Service } from "../S3Conection/S3.service";
import { Prisma } from "../generated/prisma/client";
import { CreateDetailedInformation, UpdateDetailedInformation } from "./DTO/DetailedInformation.dto";


@Injectable()
export class DetailedInformationService {
    private readonly logger = new Logger(DetailedInformationService.name)
    constructor(
        private readonly prisma: PrismaService,
        private readonly s3: S3Service
    ) { }


    async getAllDetInfo() {
        return this.prisma.detailedInformation.findMany()
    }

    async getIdDetInfo(id: number) {
        try {
            return this.prisma.detailedInformation.findUniqueOrThrow({
                where: { id },
                include: {
                    accurateDescription: { include: { compound: true } },
                    addTechnicalAdvantages: true,
                    unitPrice: true
                }
            })
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
                throw new NotFoundException(`Записи подробной инфорамции товара с id: ${id} не найденно`)
            }
            throw err
        }
    }

    async createDetInfo(dto: CreateDetailedInformation, catalogProviderId: number) {
        const catalogExist = await this.prisma.catalogProviders.findUnique({
            where: { id: catalogProviderId }
        })
        if (!catalogExist) {
            throw new NotFoundException(`Каталог поставщика с Id ${catalogProviderId} не найден.`)
        }
        try {
            const detInfoExist = await this.prisma.detailedInformation.findUnique({
                where: { catalogProvidersId: catalogProviderId }
            })
            if (detInfoExist) {
                throw new ConflictException(`Детальная информация для каталога с ID: ${catalogProviderId} уже существует.`)
            }
            return await this.prisma.detailedInformation.create({
                data: {
                    ...dto,
                    catalogProvidersId: catalogProviderId,
                    accurateDescription: dto.accurateDescription && dto.accurateDescription.length > 0 ? {
                        create: dto.accurateDescription?.map(acc => ({
                            type: acc.type,
                            description: acc.description,
                            compound: acc.compound && acc.compound.length > 0 ? {
                                create: acc.compound.map(comp => ({
                                    nameCompound: comp.nameCompound,
                                    compound: comp.compound
                                }))
                            } : undefined
                        }))
                    } : undefined,

                    unitPrice: dto.unitPrice ? {
                        create: {
                            minRetail: dto.unitPrice.minBulk,
                            maxRetail: dto.unitPrice.maxRetail,
                            maxBulk: dto.unitPrice.maxBulk,
                            minBulk: dto.unitPrice.minBulk,
                            priceNote: dto.unitPrice.priceNote,
                            warningMessage: dto.unitPrice.warningMessage
                        }
                    } : undefined,

                    inStockand: dto.inStockand && dto.inStockand.length > 0 ? {
                        create: dto.inStockand.map(ins => ({
                            warehouse: ins.warehouse,
                            availability: ins.availability
                        }))
                    } : undefined,

                    workingConditions: dto.workingConditions && dto.workingConditions.length > 0 ? {
                        create: dto.workingConditions.map(wor => ({
                            type: wor.type,
                            description: wor.description
                        }))
                    } : undefined,

                    deliveryTerms: dto.deliveryTerms && dto.deliveryTerms.length > 0 ? {
                        create: dto.deliveryTerms.map(del => ({
                            type: del.type,
                            description: del.description
                        }))
                    } : undefined,

                    addTechnicalAdvantages: dto.addTechnicalAdvantages && dto.addTechnicalAdvantages.length > 0 ? {
                        create: dto.addTechnicalAdvantages.map(adv => ({
                            type: adv.type,
                            description: adv.description
                        }))
                    } : undefined
                },

                include: {
                    accurateDescription: { include: { compound: true } },
                    unitPrice: true,
                    inStockand: true,
                    workingConditions: true,
                    deliveryTerms: true,
                    addTechnicalAdvantages: true,
                    catalogProviders: true
                }
            })
        } catch (err) {
            throw err
        }
    }

    async updateDetInfo(dto: UpdateDetailedInformation, detInfoId: number) {
        const existing = await this.prisma.detailedInformation.findUnique({
            where: { id: detInfoId },
            include: { unitPrice: true }
        })
        if (!existing) {
            throw new NotFoundException(`Детальная информация с id ${detInfoId} не найдена`)
        }

        return await this.prisma.$transaction(async (tx) => {
            if (dto.deleteAccurateDescriptionIds?.length) {
                await tx.accurateDescriptionContent.deleteMany({
                    where: { id: { in: dto.deleteAccurateDescriptionIds } }
                })
            }
            if (dto.deleteCompoundIds?.length) {
                await tx.compoundContent.deleteMany({
                    where: { id: { in: dto.deleteCompoundIds } }
                })
            }
            if (dto.deleteInStockandIds?.length) {
                await tx.inStockandContent.deleteMany({
                    where: { id: { in: dto.deleteInStockandIds } }
                })
            }
            if (dto.deleteWorkingConditionsIds?.length) {
                await tx.workingConditionsContent.deleteMany({
                    where: { id: { in: dto.deleteWorkingConditionsIds } }
                })
            }
            if (dto.deleteDeliveryTermsIds?.length) {
                await tx.deliveryTermsContent.deleteMany({
                    where: { id: { in: dto.deleteDeliveryTermsIds } }
                })
            }
            if (dto.deleteAdvantagesIds?.length) {
                await tx.addTechnicalAdvantagesContent.deleteMany({
                    where: { id: { in: dto.deleteAdvantagesIds } }
                })
            }

            if (dto.unitPrice) {
                if (existing.unitPrice) {
                    await tx.unitPriceContent.update({
                        where: { id: existing.unitPrice.id },
                        data: {
                            minRetail: dto.unitPrice.minRetail,
                            maxRetail: dto.unitPrice.maxRetail,
                            minBulk: dto.unitPrice.minBulk,
                            maxBulk: dto.unitPrice.maxBulk,
                            priceNote: dto.unitPrice.priceNote,
                            warningMessage: dto.unitPrice.warningMessage
                        }
                    })
                } else {
                    await tx.unitPriceContent.create({
                        data: {
                            detailedInformationId: detInfoId,
                            minRetail: dto.unitPrice.minRetail,
                            maxRetail: dto.unitPrice.maxRetail,
                            minBulk: dto.unitPrice.minBulk,
                            maxBulk: dto.unitPrice.maxBulk,
                            priceNote: dto.unitPrice.priceNote,
                            warningMessage: dto.unitPrice.warningMessage
                        }
                    })
                }
            }
            if (dto.accurateDescription) {
                for (const acc of dto.accurateDescription) {
                    if (acc.id) {
                        await tx.accurateDescriptionContent.update({
                            where: { id: acc.id },
                            data: {
                                type: acc.type,
                                description: acc.description,
                                compound: {
                                    update: acc.compound?.filter((c) => acc.id).map((c) => ({
                                        where: { id: c.id },
                                        data: {
                                            nameCompound: c.nameCompound,
                                            compound: c.compound
                                        }
                                    })) || [],
                                    create: acc.compound?.filter((c) => !c.id).map((c) => ({
                                        nameCompound: c.nameCompound,
                                        compound: c.compound
                                    }))
                                }
                            }
                        })
                    } else {
                        await tx.accurateDescriptionContent.create({
                            data: {
                                type: acc.type,
                                description: acc.description,
                                compound: acc.compound?.length ? {
                                    create: acc.compound.map((c) => ({
                                        nameCompound: c.nameCompound,
                                        compound: c.compound
                                    }))
                                } : undefined
                            }
                        })
                    }
                }
            }
            if (dto.addTechnicalAdvantages) {
                for (const adv of dto.addTechnicalAdvantages) {
                    if (adv.id) {
                        await tx.addTechnicalAdvantagesContent.update({
                            where: { id: adv.id },
                            data: {
                                type: adv.type,
                                description: adv.description
                            }
                        })
                    } else {
                        await tx.addTechnicalAdvantagesContent.create({
                            data: {
                                detailedInformationId: detInfoId,
                                type: adv.type,
                                description: adv.description
                            }
                        })
                    }
                }
            }
            if (dto.workingConditions) {
                for (const wk of dto.workingConditions) {
                    if (wk.id) {
                        await tx.workingConditionsContent.update({
                            where: { id: wk.id },
                            data: {
                                type: wk.type,
                                description: wk.description
                            }
                        })
                    } else {
                        await tx.workingConditionsContent.create({
                            data: {
                                detailedInformationId: detInfoId,
                                type: wk.type,
                                description: wk.description
                            }
                        })
                    }
                }
            }
            if (dto.deliveryTerms) {
                for (const dt of dto.deliveryTerms) {
                    if (dt.id) {
                        await tx.deliveryTermsContent.update({
                            where: { id: dt.id },
                            data: {
                                type: dt.type,
                                description: dt.description
                            }
                        })
                    } else {
                        await tx.deliveryTermsContent.create({
                            data: {
                                detailedInformationId: detInfoId,
                                type: dt.type,
                                description: dt.description
                            }
                        })
                    }
                }
            }
            if (dto.inStockand) {
                for (const is of dto.inStockand) {
                    if (is.id) {
                        await tx.inStockandContent.update({
                            where: { id: is.id },
                            data: {
                                warehouse: is.warehouse,
                                availability: is.availability
                            }
                        })
                    } else {
                        await tx.inStockandContent.create({
                            data: {
                                detailedInformationId: detInfoId,
                                warehouse: is.warehouse,
                                availability: is.availability
                            }
                        })
                    }
                }
            }
            const {
                accurateDescription, unitPrice, inStockand, workingConditions, deliveryTerms, addTechnicalAdvantages,
                deleteAccurateDescriptionIds, deleteCompoundIds, deleteInStockandIds, deleteWorkingConditionsIds, deleteDeliveryTermsIds, deleteAdvantagesIds,
                ...rootData
            } = dto;

            const update = await tx.detailedInformation.update({
                where: { id: detInfoId },
                data: rootData,
                include: {
                    accurateDescription: { include: { compound: true } },
                    unitPrice: true,
                    inStockand: true,
                    workingConditions: true,
                    deliveryTerms: true,
                    addTechnicalAdvantages: true,
                    catalogProviders: true,
                }
            })

            return update
        })
    }



    async deleteAll() {
        return this.prisma.detailedInformation.deleteMany()
    }
}