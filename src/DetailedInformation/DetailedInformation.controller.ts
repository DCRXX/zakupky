import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DetailedInformationService } from "./DetailedInformation.service";
import { CreateDetailedInformation, UpdateDetailedInformation } from "./DTO/DetailedInformation.dto";


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

    @Patch(':detInfoId')
    @ApiOperation({summary: 'Обновить детальную информацию'})
    @ApiConsumes('multypart/form-data')
    async updateDetInfo(
        @Body() dto: UpdateDetailedInformation,
        @Param('detInfoId', ParseIntPipe) detInfoId: number
    ){
        return this.detailedInformationService.updateDetInfo(dto, detInfoId)
    }

    @Delete()
    @ApiOperation({summary: 'Удалить все детальные информации'})
    async deleteAll(){
        return this.detailedInformationService.deleteAll()
    }
}