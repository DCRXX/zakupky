/*
  Warnings:

  - You are about to drop the `ds` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('шт', 'кг', 'м', 'палеты');

-- DropTable
DROP TABLE "ds";

-- CreateTable
CREATE TABLE "provider" (
    "id" SERIAL NOT NULL,
    "Name" TEXT,
    "ImageProviders" TEXT NOT NULL,
    "LogoSupplierCompany" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "Description" TEXT NOT NULL,
    "SupplierEvaluation" DECIMAL(10,2) NOT NULL,
    "MinOrderBatch" INTEGER NOT NULL,
    "RegisteredAddress" TEXT NOT NULL,
    "ActualAddress" TEXT NOT NULL,
    "CorrespondencePostalAddress" TEXT NOT NULL,
    "NumberPhone" INTEGER NOT NULL,
    "PostalAddress" TEXT NOT NULL,
    "SuppliersWebsite" TEXT,
    "FIOOfTheHead" TEXT NOT NULL,
    "DocOfTheHead" TEXT NOT NULL,
    "CreateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogProviders" (
    "id" SERIAL NOT NULL,
    "NameProduct" TEXT NOT NULL,
    "Price" DECIMAL(10,2) NOT NULL,
    "QuantityProduct" INTEGER NOT NULL,
    "CodeProduct" TEXT NOT NULL,
    "DescriptionProduct" TEXT NOT NULL,
    "UnitOfMeasurement" "Unit" NOT NULL DEFAULT 'шт',
    "providersId" INTEGER,

    CONSTRAINT "CatalogProviders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailedInformation" (
    "id" SERIAL NOT NULL,
    "ImageProduct" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "DopInfoUnitOfMeasurement" TEXT,
    "ConditionsCurrency" TEXT,
    "ConditionsDiscount" TEXT,
    "ConditionsPepayments" TEXT,
    "catalogProvidersId" INTEGER,

    CONSTRAINT "DetailedInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddTechnicalAdvantagesContent" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "SortOrder" INTEGER NOT NULL DEFAULT 0,
    "detailedInformationId" INTEGER,

    CONSTRAINT "AddTechnicalAdvantagesContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitPriceContent" (
    "id" SERIAL NOT NULL,
    "Retail" INTEGER NOT NULL,
    "Bulk" INTEGER NOT NULL,
    "WarningMessage" TEXT,
    "SortOrder" INTEGER NOT NULL DEFAULT 0,
    "detailedInformationId" INTEGER,

    CONSTRAINT "UnitPriceContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccurateDescriptionContent" (
    "id" SERIAL NOT NULL,
    "Size" TEXT NOT NULL,
    "Color" TEXT NOT NULL,
    "SortOrder" INTEGER NOT NULL DEFAULT 0,
    "detailedInformationId" INTEGER,

    CONSTRAINT "AccurateDescriptionContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompoundContent" (
    "id" SERIAL NOT NULL,
    "Compound" TEXT NOT NULL,
    "SortOrder" INTEGER NOT NULL DEFAULT 0,
    "accurateDescriptionContentId" INTEGER,

    CONSTRAINT "CompoundContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CatalogProviders_providersId_idx" ON "CatalogProviders"("providersId");

-- CreateIndex
CREATE INDEX "DetailedInformation_catalogProvidersId_idx" ON "DetailedInformation"("catalogProvidersId");

-- CreateIndex
CREATE INDEX "AddTechnicalAdvantagesContent_detailedInformationId_idx" ON "AddTechnicalAdvantagesContent"("detailedInformationId");

-- CreateIndex
CREATE INDEX "UnitPriceContent_detailedInformationId_idx" ON "UnitPriceContent"("detailedInformationId");

-- CreateIndex
CREATE INDEX "AccurateDescriptionContent_detailedInformationId_idx" ON "AccurateDescriptionContent"("detailedInformationId");

-- CreateIndex
CREATE INDEX "CompoundContent_accurateDescriptionContentId_idx" ON "CompoundContent"("accurateDescriptionContentId");

-- AddForeignKey
ALTER TABLE "CatalogProviders" ADD CONSTRAINT "CatalogProviders_providersId_fkey" FOREIGN KEY ("providersId") REFERENCES "provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailedInformation" ADD CONSTRAINT "DetailedInformation_catalogProvidersId_fkey" FOREIGN KEY ("catalogProvidersId") REFERENCES "CatalogProviders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddTechnicalAdvantagesContent" ADD CONSTRAINT "AddTechnicalAdvantagesContent_detailedInformationId_fkey" FOREIGN KEY ("detailedInformationId") REFERENCES "DetailedInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitPriceContent" ADD CONSTRAINT "UnitPriceContent_detailedInformationId_fkey" FOREIGN KEY ("detailedInformationId") REFERENCES "DetailedInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccurateDescriptionContent" ADD CONSTRAINT "AccurateDescriptionContent_detailedInformationId_fkey" FOREIGN KEY ("detailedInformationId") REFERENCES "DetailedInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompoundContent" ADD CONSTRAINT "CompoundContent_accurateDescriptionContentId_fkey" FOREIGN KEY ("accurateDescriptionContentId") REFERENCES "AccurateDescriptionContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
