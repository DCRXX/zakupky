import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DetailedInformationService } from "./DetailedInformation.service";
import { CreateDetailedInformation, CreateImageProduct, UpdateDetailedInformation } from "./DTO/DetailedInformation.dto";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";


@ApiTags('Детальная информация Товара')
@Controller('DetailedInformation')
export class DetailedInformationController{
    constructor(
        private readonly detailedInformationService: DetailedInformationService
    ) {}

    @Get()
    @ApiOperation({summary: 'Получить всю детальную информацию'})
    async getAllDetInfo(){
        return this.detailedInformationService.getAllDetInfo()
    }

    @Get(':id')
    @ApiOperation({summary: 'Получить детальную информацию по id'})
    async getIdDetInfo(
        @Param('id') id: number
    ){
        return this.detailedInformationService.getIdDetInfo(id)
    }

    @Post(':catalogProviderId')
    @ApiOperation({summary: 'Добавить детальную информацию'})
    @ApiConsumes('application/json')
    async createDetInfo(
        @Body() dto: CreateDetailedInformation,
        @Param('catalogProviderId', ParseIntPipe) catalogProviderId: number
    ){
        return this.detailedInformationService.createDetInfo(dto, catalogProviderId)
    }

    @Post(':idDetInfo/imageProduct')
    @ApiOperation({summary: 'Добавить изображение к детальной информации'})
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('imageProduct'))
    async addImageProduct(
        @Body() dto: CreateImageProduct,
        @Param('idDetInfo', ParseIntPipe) id: number,
        @UploadedFile() imageProduct: Express.Multer.File
    ){
        return this.detailedInformationService.addImageProduct(id, dto, imageProduct)
    }

    @Patch(':detInfoId')
    @ApiOperation({summary: 'Обновить детальную информацию'})
    @ApiConsumes('application/json')
    async updateDetInfo(
        @Body() dto: UpdateDetailedInformation,
        @Param('detInfoId', ParseIntPipe) detInfoId: number
    ){
        return this.detailedInformationService.updateDetInfo(dto, detInfoId)
    }

    @Delete(':id')
    @ApiOperation({summary: 'Удалить детальную информацию по id'})
    async deleteById(
        @Param('id', ParseIntPipe) id: number
    ){
        return this.detailedInformationService.deleteById(id)
    }
}