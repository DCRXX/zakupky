Prisma: npm install prisma@7 --save-dev npm install @prisma/client@7 npx prisma init
Swagger: npm install --save @nestjs/swagger, class-transformer, class-validator
Multer.File: npm i -D @types/multer
S3Client: npm install @aws-sdk/client-s3

Установка/Запуск:
1. https://github.com/DCRXX/zakupky.git
2. npm install
3. npx prisma generate
4. создать .env в корне :
    1. DATABASE_URL = url Базы данных
    2. BASE_URL = url на котором размещен микросервис
    3. ObserveApiKey = api ключ от Observe (https://www.observe.nestjs.com/)
    4. ObserveAppSecret = секретный ключ от Observe
    5. SWAGGER_ADMIN = логин админа в swagger
    6. SWAGGER_PASSWORD = пароль админа в swagger
    7. S3URL = ссылка на s3 хранилище
    8. S3BACKED = имя бакета s3
    9. S3ACCESSKEY = access key бакета s3
    10. S3SECRETKEY = secret key бакета s3
    11. S3REGION = регион бакета s3
5. npx prisma migrate dev/prod

6. Запуск:
    1. DEV: npx nest start --watch
    2. PROD: npx node dist/main
