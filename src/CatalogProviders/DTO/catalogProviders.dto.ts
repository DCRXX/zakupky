import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/client";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Unit } from "../../generated/prisma/enums";


export class CreateCatalogProviders {

    @ApiProperty({ description: 'Название товара', example: '' })
    @IsString()
    @IsNotEmpty()
    nameProduct: string

    @ApiProperty({ description: 'Цена товара', example: '' })
    @Transform(({ value }) => value !== undefined ? new Decimal(value) : undefined)
    @IsNotEmpty()
    price: number

    @ApiProperty({description: 'Наличие на складе', example: ''})
    @IsNumber()
    @IsNotEmpty()
    quantityProduct: number

    @ApiProperty({description: 'Код товара', example: ''})
    @IsString()
    @IsNotEmpty()
    codeProduct: string

    @ApiProperty({description: 'Описание товара', example: ''})
    @IsString()
    @IsNotEmpty()
    descriptionProduct: string

    @ApiProperty({description: 'Еденица измерения', example: Unit.PIECE, enum: Unit})
    @IsEnum(Unit)
    @IsNotEmpty()
    unitOfMeasurement: Unit

}