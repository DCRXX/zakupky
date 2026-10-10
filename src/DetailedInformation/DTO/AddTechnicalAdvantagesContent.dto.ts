import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateAddTechnicalAdvantagesContent {
    @ApiPropertyOptional({ description: 'ID записи' })
    @IsOptional()
    @IsNumber()
    id?: number

    @ApiProperty({ description: 'Тип Доп. тех. преймущевства', example: '' })
    @IsString()
    @IsNotEmpty()
    type: string

    @ApiProperty({ description: '', example: '' })
    @IsNotEmpty()
    @IsString()
    description: string
}

export class CreateWorkingConditions extends (CreateAddTechnicalAdvantagesContent) { }
export class CreateDeliveryTerms extends (CreateAddTechnicalAdvantagesContent) { }