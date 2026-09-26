import { Injectable } from "@nestjs/common";
import { PrismaModule } from "../PrismaConection/prisma.module";
import { PrismaService } from "../PrismaConection/prisma.service";
import { createProviderDto } from "./DTO/provider.dto";
import { slugify } from "../slugify";
import { S3Service } from "../S3Conection/S3.service";
import { nanoid } from 'nanoid';
import { format } from 'date-fns';


@Injectable()
export class ProviderService {
    private readonly DateNow = `${format(Date.now(), 'yyyy-MM-dd_HH-mm-ss')}`
    constructor(
        private readonly prisma: PrismaService,
        private readonly S3: S3Service
    ) { }

    async getAll() {
        return this.prisma.provider.findMany()
    }

    async createProviders(
        dto: createProviderDto,
        ImageProviders: Express.Multer.File,
        LogoSupplierCompany: Express.Multer.File,
        DocOfTheHead: Express.Multer.File
    ) {
        let ImagePathProviders: string = ''
        let LogoSupplierPathCompany: string = ''
        let DocOfThePathHead: string = ''
        const PathProviders = `${dto.Name}-${nanoid(8)}`

        if(ImageProviders){
            const filename = `${nanoid(8)}-${slugify(ImageProviders.originalname)}`
            const path = `${PathProviders}/${filename}`
            ImagePathProviders = await this.S3.uploadFile(ImageProviders, path)
        }
        if(LogoSupplierCompany){
            const filename = `${nanoid(8)}-${slugify(LogoSupplierCompany.originalname)}`
            const path = `${PathProviders}/${filename}`
            LogoSupplierPathCompany = await this.S3.uploadFile(LogoSupplierCompany, path)
        }
        if(DocOfTheHead){
            const filename = `${nanoid(8)}-${slugify(DocOfTheHead.originalname)}`
            const path = `${PathProviders}/${filename}`
            DocOfThePathHead = await this.S3.uploadFile(DocOfTheHead, path)
        }

        return this.prisma.provider.create({
            data: {
                ...dto,
                ImageProviders: ImagePathProviders,
                LogoSupplierCompany: LogoSupplierPathCompany,
                DocOfTheHead: DocOfThePathHead
            }
        })
    }

    async deleteAll(){
        const providers = await this.prisma.provider.findMany({
            where:{
                OR:[
                    {ImageProviders: {not: ''}},
                    {LogoSupplierCompany: {not: ''}},
                    {DocOfTheHead: {not: ''}}
                ]
            }
        })

        await Promise.all(
            providers.map((adv) =>{
                adv.ImageProviders ? this.S3.deleteFile(adv.ImageProviders): Promise.resolve()
                adv.LogoSupplierCompany ? this.S3.deleteFile(adv.LogoSupplierCompany): Promise.resolve()
                adv.DocOfTheHead ? this.S3.deleteFile(adv.DocOfTheHead): Promise.resolve()
            })
        )

        return this.prisma.provider.deleteMany()
    }
}
