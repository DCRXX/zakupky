import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { catalogProvidersService } from "./catalogProviders.service";
import { CreateCatalogProviders } from './DTO/catalogProviders.dto'


@ApiTags('Каталог поставщика')
@Controller('catalogProviders')
export class catalogProvidersController {
    constructor(
        private readonly catalogProvidersService: catalogProvidersService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Получить все каталоги поставщиков' })
    async getAllCatalog() {
        return this.catalogProvidersService.getAllCatalog()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить каталог поставщика по id' })
    async getIdCatalog(
        @Param('id') id: number
    ) {
        return this.catalogProvidersService.getIdCatalog(id)
    }

    @Post(':id')
    @ApiOperation({ summary: 'Создать каталог для поставщика (id)' })
    @ApiConsumes('application/x-www-form-urlencoded')
    async createCatalog(
        @Body() dto: CreateCatalogProviders,
        @Param('id') id: number
    ) {
        return this.catalogProvidersService.createCatalog(dto, id)
    }

    @Patch(':id')
    @ApiOperation({summary: 'Обновить каталог Поставщика'})
    @ApiConsumes('application/x-www-form-urlencoded')
    async patchCatalog(
        @Body() dto: CreateCatalogProviders,
        @Param('id') id: number
    ){
        return this.catalogProvidersService.patchCatalog(dto, id)
    }

}