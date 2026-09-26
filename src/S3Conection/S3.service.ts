import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { S3Client, DeleteObjectCommand, ListBucketsCommand, HeadBucketCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { error } from "console";


@Injectable()
export class S3Service implements OnModuleInit {
    private readonly s3: S3Client
    private readonly bucket: string
    private readonly publicURL: string
    private readonly logger = new Logger(S3Service.name)

    private extractKeyFromUrl(url: string): string | null {
        if (!url) return null;
        if (url.startsWith(this.publicURL + '/')) {
            return url.slice(this.publicURL.length + 1);
        }
        return null;
    }


    constructor() {
        this.bucket = process.env.S3BACKED!
        this.publicURL = process.env.S3URL!

        this.s3 = new S3Client({
            endpoint: process.env.S3URL!,
            region: process.env.S3REGION,
            credentials: {
                accessKeyId: process.env.S3ACCESSKEY!,
                secretAccessKey: process.env.S3SECRETKEY!
            },
            forcePathStyle: true
        })
    }

    async onModuleInit(): Promise<void> {
        try {
            const command = new HeadBucketCommand({ Bucket: this.bucket })
            await this.s3.send(command)
            this.logger.log(`Бакет "${this.bucket}" доступен`)
        } catch (error) {
            this.logger.error(`Бакет "${this.bucket}" недоступен`, error)
            throw error
        }
    }

    async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
        const upload = new Upload({
            client: this.s3,
            params: {
                Bucket: this.bucket,
                Key: path,
                Body: file.buffer,
                ContentType: file.mimetype
            }
        })
        try {
            await upload.done()
            return `${this.publicURL}/${this.bucket}/${path}`
        } catch(error: any){
            this.logger.error(`Не удалось загрузить файл ${file.fieldname} по пути ${path}`, error)
            throw new Error(`Не удалось загрузить файл`, error.message)
        }
    }

    async deleteFile(url: string): Promise<void> {
        const key = this.extractKeyFromUrl(url)
        if (!key) {
            console.warn(`[S3] Не удалось извлечь ключ из URL: ${url}`);
            return
        }

        await this.s3.send(
            new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: key
            })
        )
    }
}