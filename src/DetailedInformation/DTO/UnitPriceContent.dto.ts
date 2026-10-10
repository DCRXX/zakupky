import { ApiProperty, ApiPropertyOptional, ApiResponse } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateUnitPriceContent {
    @ApiPropertyOptional({ description: 'ID записи' })
    @IsOptional()
    @IsNumber() 
    id?: number

    @ApiProperty({ description: 'Розничная цена минимальная', example: '' })
    @IsNumber()
    @IsNotEmpty()
    minRetail: number

    @ApiProperty({ description: 'Розничная цена максимальная', example: '' })
    @IsNumber()
    @IsNotEmpty()
    maxRetail: number

    @ApiProperty({ description: 'Оптовая цена минимальная', example: '' })
    @IsNotEmpty()
    @IsNumber()
    minBulk: number

    @ApiProperty({ description: 'Оптовая цена максимальная', example: '' })
    @IsNotEmpty()
    @IsNumber()
    maxBulk: number

    @ApiProperty({description: 'Дополнительная информация цены товара', example: '', required: false})
    @IsOptional()
    @IsString()
    priceNote?: string

    @ApiProperty({ description: 'Предупреждающее сообщение о цене', example: '', required: false })
    @IsString()
    @IsOptional()
    warningMessage?: string
}