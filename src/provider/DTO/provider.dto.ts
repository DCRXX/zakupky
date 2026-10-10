import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger"
import { Decimal } from "@prisma/client/runtime/client"
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'


export class createProviderDto {

    @ApiProperty({ example: '', description: 'Наименование поставщика или ФИО' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: '', description: 'Фото Руководителя ', format: "binary" })
    imageProviders: string

    @ApiProperty({ example: '', description: 'Лого компании поставщика', format: "binary" })
    logoSupplierCompany: string

    @ApiProperty({ description: 'Активен или нет Поставщик' })
    @Transform(({ value }) => value === 'true' || value === true)
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean

    @ApiProperty({ example: '', description: 'Описание Поставщика' })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({ example: '', description: 'Оценка поставщика ' })
    @IsNumber()
    @IsNotEmpty()
    supplierEvaluation: number

    @ApiProperty({ example: '', description: 'Минимальная партия/количество' })
    @Transform(({ value }) => value !== undefined ? parseInt(value, 10) : undefined)
    @IsNumber()
    @IsNotEmpty()
    minOrderBatch: number

    @ApiProperty({ example: '', description: 'Юридический адрес' })
    @IsString()
    @IsNotEmpty()
    registeredAddress: string

    @ApiProperty({ example: '', description: 'Фактический адрес' })
    @IsString()
    @IsNotEmpty()
    actualAddress: string

    @ApiProperty({ example: '', description: 'Корреспондентский Почтовый адрес' })
    @IsString()
    @IsNotEmpty()
    correspondencePostalAddress: string

    @ApiProperty({ example: '', description: 'Номер телефона' })
    @IsString()
    @IsNotEmpty()
    numberPhone: string

    @ApiProperty({ example: '', description: 'Офиц. Адресс почты' })
    @IsString()
    @IsNotEmpty()
    postalAddress: string

    @ApiProperty({ example: '', description: 'Сайт поставщика' })
    @IsString()
    @IsOptional()
    suppliersWebsite?: string

    @ApiProperty({ example: '', description: 'ФИО руководителя' })
    @IsString()
    @IsNotEmpty()
    fioOfTheHead: string

    @ApiProperty({ example: '', description: 'Документ подтверждающий полномочия руководителя', format: "binary" })
    docOfTheHead: string
}