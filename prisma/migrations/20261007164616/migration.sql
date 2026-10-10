/*
  Warnings:

  - You are about to drop the column `SortOrder` on the `AddTechnicalAdvantagesContent` table. All the data in the column will be lost.
  - You are about to drop the column `SortOrder` on the `UnitPriceContent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AddTechnicalAdvantagesContent" DROP COLUMN "SortOrder";

-- AlterTable
ALTER TABLE "UnitPriceContent" DROP COLUMN "SortOrder";
