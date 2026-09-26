import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger"
import { Decimal } from "@prisma/client/runtime/client"
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'


export class createProviderDto {

    @ApiProperty({ example: '', description: 'Наименование поставщика или ФИО' })
    @IsString()
    @IsNotEmpty()
    Name: string

    @ApiProperty({ example: '', description: 'Фото Руковадителя ', format: "binary" })
    ImageProviders: string

    @ApiProperty({ example: '', description: 'Лого компании поставщика', format: "binary" })
    LogoSupplierCompany: string

    @ApiProperty({ description: 'Активен или нет Поставщик' })
    @Transform(({ value }) => value === 'true' || value === true)
    @IsNotEmpty()
    isActive: boolean

    @ApiProperty({ example: '', description: 'Описание Поставщика' })
    @IsString()
    @IsNotEmpty()
    Description: string

    @ApiProperty({ example: '', description: 'Оценка поставщика ' })
    @Transform(({ value }) => value !== undefined ? new Decimal(value) : undefined)
    @IsNotEmpty()
    SupplierEvaluation: number

    @ApiProperty({ example: '', description: 'Минимальная цена заказа' })
    @Transform(({ value }) => value !== undefined ? parseInt(value, 10) : undefined)
    @IsNumber()
    @IsNotEmpty()
    MinOrderBatch: number

    @ApiProperty({ example: '', description: 'Юредический адресс' })
    @IsString()
    @IsNotEmpty()
    RegisteredAddress: string

    @ApiProperty({ example: '', description: 'Фактический адрес' })
    @IsString()
    @IsNotEmpty()
    ActualAddress: string

    @ApiProperty({ example: '', description: 'Корреспондентский Почтовый адрес' })
    @IsString()
    @IsNotEmpty()
    CorrespondencePostalAddress: string

    @ApiProperty({ example: '', description: 'Номер телефона' })
    @IsString()
    @IsNotEmpty()
    NumberPhone: string

    @ApiProperty({ example: '', description: 'Офиц. Адресс почты' })
    @IsString()
    @IsNotEmpty()
    PostalAddress: string

    @ApiProperty({ example: '', description: 'Сайт поставщика' })
    @IsString()
    @IsNotEmpty()
    SuppliersWebsite?: string

    @ApiProperty({ example: '', description: 'ФИО руководителя' })
    @IsString()
    @IsNotEmpty()
    FIOOfTheHead: string

    @ApiProperty({ example: '', description: 'Документ подтверждающий полномочия руководителя', format: "binary" })
    DocOfTheHead: string
}

class ProviderIdDto {
    @ApiProperty({ example: 1, })
    id: number;
}

export class getProviderDto extends IntersectionType(
    ProviderIdDto,
    PartialType(createProviderDto),
) { }


export class createCatelogProviders {
    @ApiProperty({ example: '', description: 'Название товара' })
    NameProduct: string

    @ApiProperty({ example: '', description: 'Цена товара' })
    Price: Decimal

    @ApiProperty({ example: '', description: 'Наличие на складе' })
    QuantityProduct: number

    @ApiProperty({ example: '', description: ' Код товара' })
    CodeProduct: string

    @ApiProperty({ example: '', description: 'Описание товара' })
    DescriptionProduct: string

    @ApiProperty({ example: '', description: 'Описание товара' })
    UnitOfMeasurement: string

    @ApiProperty({ example: '', description: 'Описание товара' })
    providerId: number
}

class CategoryIdDto {
    @ApiProperty({ example: 1, })
    id: number;
}

export class getCategoryDto extends IntersectionType(
    CategoryIdDto,
    PartialType(createCatelogProviders),
) { }