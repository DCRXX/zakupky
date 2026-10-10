/*
  Warnings:

  - You are about to drop the column `CodeProduct` on the `CatalogProviders` table. All the data in the column will be lost.
  - You are about to drop the column `DescriptionProduct` on the `CatalogProviders` table. All the data in the column will be lost.
  - You are about to drop the column `NameProduct` on the `CatalogProviders` table. All the data in the column will be lost.
  - You are about to drop the column `Price` on the `CatalogProviders` table. All the data in the column will be lost.
  - You are about to drop the column `QuantityProduct` on the `CatalogProviders` table. All the data in the column will be lost.
  - You are about to drop the column `UnitOfMeasurement` on the `CatalogProviders` table. All the data in the column will be lost.
  - You are about to drop the column `Compound` on the `CompoundContent` table. All the data in the column will be lost.
  - You are about to drop the column `NameCompound` on the `CompoundContent` table. All the data in the column will be lost.
  - You are about to drop the column `Code` on the `DetailedInformation` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `DetailedInformation` table. All the data in the column will be lost.
  - You are about to drop the column `DopInfoUnitOfMeasurement` on the `DetailedInformation` table. All the data in the column will be lost.
  - You are about to drop the column `ImageProduct` on the `DetailedInformation` table. All the data in the column will be lost.
  - You are about to drop the column `ProductionTime` on the `DetailedInformation` table. All the data in the column will be lost.
  - You are about to drop the column `Availability` on the `InStockandContent` table. All the data in the column will be lost.
  - You are about to drop the column `Bulk` on the `UnitPriceContent` table. All the data in the column will be lost.
  - You are about to drop the column `Retail` on the `UnitPriceContent` table. All the data in the column will be lost.
  - You are about to drop the column `WarningMessage` on the `UnitPriceContent` table. All the data in the column will be lost.
  - You are about to drop the column `ActualAddress` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `CorrespondencePostalAddress` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `CreateTime` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `DocOfTheHead` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `FIOOfTheHead` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `ImageProviders` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `LogoSupplierCompany` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `MinOrderBatch` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `NumberPhone` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `PostalAddress` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `RegisteredAddress` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `SupplierEvaluation` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `SuppliersWebsite` on the `provider` table. All the data in the column will be lost.
  - Added the required column `codeProduct` to the `CatalogProviders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionProduct` to the `CatalogProviders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameProduct` to the `CatalogProviders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `CatalogProviders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityProduct` to the `CatalogProviders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compound` to the `CompoundContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameCompound` to the `CompoundContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `DetailedInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `DetailedInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageProduct` to the `DetailedInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productionTime` to the `DetailedInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availability` to the `InStockandContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bulk` to the `UnitPriceContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retail` to the `UnitPriceContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actualAddress` to the `provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correspondencePostalAddress` to the `provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docOfTheHead` to the `provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fioOfTheHead` to the `provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageProviders` to the `provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoSupplierCompany` to the `provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minOrderBatch` to the `provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberPhone` to the `provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalAddress` to the `provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registeredAddress` to the `provider` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "DetailedInformation_catalogProvidersId_idx";

-- DropIndex
DROP INDEX "UnitPriceContent_detailedInformationId_idx";

-- AlterTable
ALTER TABLE "CatalogProviders" DROP COLUMN "CodeProduct",
DROP COLUMN "DescriptionProduct",
DROP COLUMN "NameProduct",
DROP COLUMN "Price",
DROP COLUMN "QuantityProduct",
DROP COLUMN "UnitOfMeasurement",
ADD COLUMN     "codeProduct" TEXT NOT NULL,
ADD COLUMN     "descriptionProduct" TEXT NOT NULL,
ADD COLUMN     "nameProduct" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "quantityProduct" INTEGER NOT NULL,
ADD COLUMN     "unitOfMeasurement" "Unit" NOT NULL DEFAULT 'PIECE';

-- AlterTable
ALTER TABLE "CompoundContent" DROP COLUMN "Compound",
DROP COLUMN "NameCompound",
ADD COLUMN     "compound" TEXT NOT NULL,
ADD COLUMN     "nameCompound" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DetailedInformation" DROP COLUMN "Code",
DROP COLUMN "Description",
DROP COLUMN "DopInfoUnitOfMeasurement",
DROP COLUMN "ImageProduct",
DROP COLUMN "ProductionTime",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "dopInfoUnitOfMeasurement" TEXT,
ADD COLUMN     "imageProduct" TEXT NOT NULL,
ADD COLUMN     "productionTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InStockandContent" DROP COLUMN "Availability",
ADD COLUMN     "availability" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "UnitPriceContent" DROP COLUMN "Bulk",
DROP COLUMN "Retail",
DROP COLUMN "WarningMessage",
ADD COLUMN     "bulk" TEXT NOT NULL,
ADD COLUMN     "retail" TEXT NOT NULL,
ADD COLUMN     "warningMessage" TEXT;

-- AlterTable
ALTER TABLE "provider" DROP COLUMN "ActualAddress",
DROP COLUMN "CorrespondencePostalAddress",
DROP COLUMN "CreateTime",
DROP COLUMN "Description",
DROP COLUMN "DocOfTheHead",
DROP COLUMN "FIOOfTheHead",
DROP COLUMN "ImageProviders",
DROP COLUMN "LogoSupplierCompany",
DROP COLUMN "MinOrderBatch",
DROP COLUMN "Name",
DROP COLUMN "NumberPhone",
DROP COLUMN "PostalAddress",
DROP COLUMN "RegisteredAddress",
DROP COLUMN "SupplierEvaluation",
DROP COLUMN "SuppliersWebsite",
ADD COLUMN     "actualAddress" TEXT NOT NULL,
ADD COLUMN     "correspondencePostalAddress" TEXT NOT NULL,
ADD COLUMN     "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "docOfTheHead" TEXT NOT NULL,
ADD COLUMN     "fioOfTheHead" TEXT NOT NULL,
ADD COLUMN     "imageProviders" TEXT NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logoSupplierCompany" TEXT NOT NULL,
ADD COLUMN     "minOrderBatch" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "numberPhone" TEXT NOT NULL,
ADD COLUMN     "postalAddress" TEXT NOT NULL,
ADD COLUMN     "registeredAddress" TEXT NOT NULL,
ADD COLUMN     "supplierEvaluation" DECIMAL(10,2) DEFAULT 0,
ADD COLUMN     "suppliersWebsite" TEXT;
