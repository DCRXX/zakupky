import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProviderService } from "./provider.service";
import { createProviderDto } from "./DTO/provider.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import type { Multer } from 'multer';

type MulterFile = Express.Multer.File

@ApiTags('Поставщики')
@Controller('provider')
export class ProviderController {
    constructor(
        private readonly providerService: ProviderService,
    ) { }

    @ApiOperation({ summary: 'Получить все карточки поставщиков' })
    @Get()
    async getAllCards() {
        return await this.providerService.getAllCards()
    }

    @ApiOperation({ summary: 'Получить все данные 1 поставщика по id' })
    @Get(':id')
    async getIdProvider(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.providerService.getIdProvider(id)
    }

    @ApiOperation({ summary: 'Добавить поставщика' })
    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'imageProviders', maxCount: 1 },
        { name: 'logoSupplierCompany', maxCount: 1 },
        { name: 'docOfTheHead', maxCount: 1 }
    ]))
    @ApiBody({
        description: 'Описание схемы',
        type: createProviderDto
    })
    async createProviders(
        @Body() dto: createProviderDto,
        @UploadedFiles() files: {
            imageProviders?: MulterFile[],
            logoSupplierCompany?: MulterFile[],
            docOfTheHead?: MulterFile[]
        }
    ) {
        if (!files.imageProviders || !files.logoSupplierCompany || !files.docOfTheHead) {
            throw new BadRequestException('Все три файла являются обязательными');
        }

        const imageProviders = files.imageProviders?.[0]
        const logoSupplierCompany = files.logoSupplierCompany?.[0]
        const docOfTheHead = files.docOfTheHead?.[0]

        return await this.providerService.createProviders(dto, imageProviders, logoSupplierCompany, docOfTheHead)
    }

    @ApiOperation({ summary: 'Удалить поставщика по id' })
    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        return await this.providerService.deleteById(id)
    }

}