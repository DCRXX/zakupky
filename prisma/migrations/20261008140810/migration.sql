/*
  Warnings:

  - You are about to drop the column `Color` on the `AccurateDescriptionContent` table. All the data in the column will be lost.
  - You are about to drop the column `Size` on the `AccurateDescriptionContent` table. All the data in the column will be lost.
  - You are about to drop the column `ConditionsCurrency` on the `DetailedInformation` table. All the data in the column will be lost.
  - You are about to drop the column `ConditionsDiscount` on the `DetailedInformation` table. All the data in the column will be lost.
  - You are about to drop the column `ConditionsPepayments` on the `DetailedInformation` table. All the data in the column will be lost.
  - You are about to drop the column `accurateDescriptionId` on the `DetailedInformation` table. All the data in the column will be lost.
  - Added the required column `description` to the `AccurateDescriptionContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `AccurateDescriptionContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ProductionTime` to the `DetailedInformation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccurateDescriptionContent" DROP CONSTRAINT "AccurateDescriptionContent_detailedInformationId_fkey";

-- DropForeignKey
ALTER TABLE "AddTechnicalAdvantagesContent" DROP CONSTRAINT "AddTechnicalAdvantagesContent_detailedInformationId_fkey";

-- DropForeignKey
ALTER TABLE "UnitPriceContent" DROP CONSTRAINT "UnitPriceContent_detailedInformationId_fkey";

-- DropIndex
DROP INDEX "AccurateDescriptionContent_detailedInformationId_key";

-- DropIndex
DROP INDEX "DetailedInformation_accurateDescriptionId_key";

-- AlterTable
ALTER TABLE "AccurateDescriptionContent" DROP COLUMN "Color",
DROP COLUMN "Size",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DetailedInformation" DROP COLUMN "ConditionsCurrency",
DROP COLUMN "ConditionsDiscount",
DROP COLUMN "ConditionsPepayments",
DROP COLUMN "accurateDescriptionId",
ADD COLUMN     "ProductionTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UnitPriceContent" ALTER COLUMN "Retail" SET DATA TYPE TEXT,
ALTER COLUMN "Bulk" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "provider" ALTER COLUMN "SupplierEvaluation" DROP NOT NULL;

-- CreateTable
CREATE TABLE "WorkingConditionsContent" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detailedInformationId" INTEGER,

    CONSTRAINT "WorkingConditionsContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InStockandContent" (
    "id" SERIAL NOT NULL,
    "warehouse" TEXT NOT NULL,
    "Availability" BOOLEAN NOT NULL,
    "detailedInformationId" INTEGER,

    CONSTRAINT "InStockandContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkingConditionsContent_detailedInformationId_idx" ON "WorkingConditionsContent"("detailedInformationId");

-- CreateIndex
CREATE INDEX "InStockandContent_detailedInformationId_idx" ON "InStockandContent"("detailedInformationId");

-- AddForeignKey
ALTER TABLE "WorkingConditionsContent" ADD CONSTRAINT "WorkingConditionsContent_detailedInformationId_fkey" FOREIGN KEY ("detailedInformationId") REFERENCES "DetailedInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InStockandContent" ADD CONSTRAINT "InStockandContent_detailedInformationId_fkey" FOREIGN KEY ("detailedInformationId") REFERENCES "DetailedInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddTechnicalAdvantagesContent" ADD CONSTRAINT "AddTechnicalAdvantagesContent_detailedInformationId_fkey" FOREIGN KEY ("detailedInformationId") REFERENCES "DetailedInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitPriceContent" ADD CONSTRAINT "UnitPriceContent_detailedInformationId_fkey" FOREIGN KEY ("detailedInformationId") REFERENCES "DetailedInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccurateDescriptionContent" ADD CONSTRAINT "AccurateDescriptionContent_detailedInformationId_fkey" FOREIGN KEY ("detailedInformationId") REFERENCES "DetailedInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
