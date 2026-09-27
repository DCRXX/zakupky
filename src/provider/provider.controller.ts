import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProviderService } from "./provider.service";
import { createProviderDto, getProviderDto } from "./DTO/provider.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import type { Multer } from 'multer';

type MulterFile = Express.Multer.File

@ApiTags('Поставщики')
@Controller('provider')
export class ProviderController{
    constructor (
        private readonly providerService: ProviderService,
    ){}

    @ApiOperation({summary: 'Получить всех провайдеров'})
    @Get()
    @ApiResponse({
        status: 200,
        description: 'Получить всех Поставщиков',
        type: [getProviderDto]
    })
    async getAll(){
        return await this.providerService.getAll()
    }

    @ApiOperation({summary: 'Добавить провайдера'})
    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'ImageProviders', maxCount: 1},
        {name: 'LogoSupplierCompany', maxCount: 1},
        {name: 'DocOfTheHead', maxCount: 1}
    ]))
    @ApiBody({
        description: 'Описание схемы',
        type: createProviderDto
    })
    async createProviders(
        @Body() dto: createProviderDto,
        @UploadedFiles() files: {
            ImageProviders?: MulterFile[],
            LogoSupplierCompany?: MulterFile[],
            DocOfTheHead?: MulterFile[]
        } 
    ){
        if(!files.DocOfTheHead){
            throw new BadRequestException('Добавьте - Документ подтверждающий полномочия руководителя')
        }
        if(!files.ImageProviders){
            throw new BadRequestException('Добавьте - Фото Руковадителя')
        }
        if(!files.LogoSupplierCompany){
            throw new BadRequestException('Добавьте - Лого компании поставщика')
        }

        const ImageProviders = files.ImageProviders?.[0]
        const LogoSupplierCompany = files.LogoSupplierCompany?.[0]
        const DocOfTheHead = files.DocOfTheHead?.[0]

        return await this.providerService.createProviders(dto, ImageProviders, LogoSupplierCompany, DocOfTheHead)
    }

    @ApiOperation({summary: 'Удалить всех поставщиков'})
    @Delete()
    async deleteAll(){
        return await this.providerService.deleteAll()
    }


    @ApiOperation({summary: 'Удалить поставщика по id'})
    @Delete(':id')
    async deleteById(@Param('id') id: number){
        return await this.providerService.deleteById(+id)
    }

}