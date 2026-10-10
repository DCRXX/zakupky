/*
  Warnings:

  - A unique constraint covering the columns `[detailedInformationId]` on the table `AccurateDescriptionContent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accurateDescriptionId]` on the table `DetailedInformation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[catalogProvidersId]` on the table `DetailedInformation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[detailedInformationId]` on the table `UnitPriceContent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AccurateDescriptionContent" DROP CONSTRAINT "AccurateDescriptionContent_detailedInformationId_fkey";

-- AlterTable
ALTER TABLE "DetailedInformation" ADD COLUMN     "accurateDescriptionId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "AccurateDescriptionContent_detailedInformationId_key" ON "AccurateDescriptionContent"("detailedInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "DetailedInformation_accurateDescriptionId_key" ON "DetailedInformation"("accurateDescriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "DetailedInformation_catalogProvidersId_key" ON "DetailedInformation"("catalogProvidersId");

-- CreateIndex
CREATE UNIQUE INDEX "UnitPriceContent_detailedInformationId_key" ON "UnitPriceContent"("detailedInformationId");

-- AddForeignKey
ALTER TABLE "AccurateDescriptionContent" ADD CONSTRAINT "AccurateDescriptionContent_detailedInformationId_fkey" FOREIGN KEY ("detailedInformationId") REFERENCES "DetailedInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
