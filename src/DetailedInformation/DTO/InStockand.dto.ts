import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateInStockand {
    @ApiPropertyOptional({ description: 'ID записи (обязательно при обновлении)' })
    @IsOptional()
    @IsNumber()
    id?: number; // <-- ДОБАВЛЕНО

    @ApiProperty({ description: 'Склад', example: '' })
    @IsString()
    @IsNotEmpty()
    warehouse: string

    @ApiProperty({ description: 'Наличие на складе', example: '' })
    @IsBoolean()
    availability: boolean
}