import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { error } from "console";


@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name)

    constructor() {
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL!
        })

        super({
            adapter,
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'stdout', level: 'info' },
                { emit: 'stdout', level: 'warn' },
                { emit: 'stdout', level: 'error' },
            ]
        })
    }

    async onModuleInit() {
        try{
            this.logger.log('Подключение к базе данных')
            await this.$connect()
            const dbInfo = await this.$queryRaw`SELECT current_database() as db, version() as version`
            const result = Array.isArray(dbInfo) ? dbInfo[0] : dbInfo
            this.logger.log('Успешное подключение к базе данных')
            this.logger.log(`База данных: ${result.db}`)
        } catch(err){
            if(err instanceof Error){
                this.logger.error(`Ошибка подключения к базе данных ${err.message}`)
            } else(
                this.logger.error('Неизвестная ошибка')
            )
            throw err
        }
    }

    async onModuleDestroy() {
        this.logger.log('Отключение от базу данных')
        await this.$disconnect()
        this.logger.log('Соединение закрыто')
    }
}