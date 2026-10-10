import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"

export class CompoundContent {
    @ApiPropertyOptional({ description: 'ID записи' })
    @IsOptional()
    @IsNumber()
    id?: number

    @ApiProperty({ description: 'Материал', example: '' })
    @IsNotEmpty()
    @IsString()
    nameCompound: string

    @ApiProperty({ description: 'Состав', example: '' })
    @IsNotEmpty()
    @IsString()
    compound: string
}


export class CreateAccurateDescriptionContent {
    @ApiPropertyOptional({ description: 'ID записи' })
    @IsOptional()
    @IsNumber()
    id?: number

    @ApiProperty({ description: 'Размер продукта', example: '' })
    @IsString()
    @IsNotEmpty()
    type: string

    @ApiProperty({ description: 'Цвет продукта', example: '' })
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({
        description: 'Состав/Материалы товара',
        required: false,
        type: [CompoundContent]
    })
    @ValidateNested({ each: true })
    @IsArray()
    @IsOptional()
    @Type(() => CompoundContent)
    compound?: CompoundContent[]


}