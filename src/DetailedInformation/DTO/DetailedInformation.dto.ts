import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { ArrayMaxSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAccurateDescriptionContent } from "./AccurateDescriptionContent.dto";
import { CreateUnitPriceContent } from "./UnitPriceContent.dto";
import { CreateAddTechnicalAdvantagesContent, CreateDeliveryTerms, CreateWorkingConditions } from "./AddTechnicalAdvantagesContent.dto";
import { Type } from "class-transformer";
import { CreateInStockand } from "./InStockand.dto";


export class CreateDetailedInformation {
    @ApiProperty({ description: 'Изображение товара', example: '', format: 'binary' })
    @IsNotEmpty()
    imageProduct: string

    @ApiProperty({ description: 'Описание товара', example: '' })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({ description: 'Код товара', example: '' })
    @IsString()
    @IsOptional()
    code: string

    @ApiProperty({ description: 'Дополнительная информация Едениц измерения', example: '', required: false })
    @IsString()
    @IsOptional()
    dopInfoUnitOfMeasurement?: string


    @ApiProperty({
        description: 'Точное описание',
        type: () => [CreateAccurateDescriptionContent],
        required: false
    })
    @IsOptional()
    @ValidateNested()
    @IsArray()
    @ArrayMaxSize(5, { message: 'Можно добавить максимум 5 записей точного описания' })
    @Type(() => CreateAccurateDescriptionContent)
    accurateDescription?: CreateAccurateDescriptionContent[]


    @ApiProperty({
        description: 'Цена за еденицу товара',
        required: false,
        type: () => CreateUnitPriceContent
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateUnitPriceContent)
    unitPrice?: CreateUnitPriceContent

    @ApiProperty({
        description: 'Наличие на складе',
        required: false,
        type: () => [CreateInStockand]
    })
    @IsOptional()
    @ValidateNested()
    @IsArray()
    @ArrayMaxSize(10, { message: 'Можно добавить максимум 10 записей наличие на складе' })
    @Type(() => CreateInStockand)
    inStockand?: CreateInStockand[]

    @ApiProperty({ description: 'Срок Изгатовления', example: '' })
    @IsString()
    @IsNotEmpty()
    productionTime: string


    @ApiProperty({
        description: 'Условия работы',
        required: false,
        type: () => [CreateWorkingConditions]
    })
    @IsArray()
    @IsOptional()
    @ArrayMaxSize(5, { message: 'Можно добавить максимум 5 записей условий работы' })
    @ValidateNested()
    @Type(() => CreateWorkingConditions)
    workingConditions?: CreateWorkingConditions[]

    @ApiProperty({
        description: 'Условия Доставки',
        required: false,
        type: () => [CreateDeliveryTerms]
    })
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @ArrayMaxSize(5, { message: 'Можно добавить максимум 5 записей условий доставки' })
    @Type(() => CreateDeliveryTerms)
    deliveryTerms?: CreateDeliveryTerms[]



    @ApiProperty({
        description: 'Дополнительные технические преимущества',
        required: false,
        type: [CreateAddTechnicalAdvantagesContent]
    })
    @IsArray()
    @ArrayMaxSize(5, { message: 'Можно добавить максимум 5 записей Доп. Тех. Преимущества' })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateAddTechnicalAdvantagesContent)
    addTechnicalAdvantages?: CreateAddTechnicalAdvantagesContent[]

    @ApiProperty({ description: 'Id поставщика к которому привязано детальная информация', })
    @IsNotEmpty()
    @IsNumber()
    catalogProvidersId: number
}

export class UpdateDetailedInformation extends PartialType(
    OmitType(CreateDetailedInformation, ['catalogProvidersId'] as const)
) {
    @ApiProperty({
        description: 'Дополнительные технические преимущества (передавайте id для обновления существующих)',
        type: [CreateAddTechnicalAdvantagesContent],
        required: false
    })
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateAddTechnicalAdvantagesContent)
    addTechnicalAdvantages?: CreateAddTechnicalAdvantagesContent[];

    @ApiPropertyOptional({
        description: 'ID записей AddTechnicalAdvantages, которые нужно удалить',
        type: [Number]
    })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    deleteAdvantagesIds?: number[];

    @ApiPropertyOptional({
        description: 'ID записей AccurateDescription, которые нужно удалить',
        type: [Number]
    })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    deleteAccurateDescriptionIds?: number[];

    @ApiPropertyOptional({
        description: 'ID записей Compound, которые нужно удалить',
        type: [Number]
    })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    deleteCompoundIds?: number[];

    @ApiPropertyOptional({
        description: 'ID записей InStockand, которые нужно удалить',
        type: [Number]
    })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    deleteInStockandIds?:number[]

    @ApiPropertyOptional({
        description: 'ID записай WorkingConditions, которые нужно удалить',
        type: [Number]
    })
    @IsOptional()
    @IsArray()
    @IsNumber({}, {each: true})
    deleteWorkingConditionsIds?: number[]

    @ApiPropertyOptional({
        description: 'ID записей DeliveryTerms, которые нйжно удалить',
        type: [Number]
    })
    @IsOptional()
    @IsArray()
    @IsNumber({}, {each: true})
    deleteDeliveryTermsIds?: number[]
}