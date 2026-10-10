/*
  Warnings:

  - You are about to drop the column `bulk` on the `UnitPriceContent` table. All the data in the column will be lost.
  - You are about to drop the column `retail` on the `UnitPriceContent` table. All the data in the column will be lost.
  - Added the required column `maxBulk` to the `UnitPriceContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxRetail` to the `UnitPriceContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minBulk` to the `UnitPriceContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minRetail` to the `UnitPriceContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UnitPriceContent" DROP COLUMN "bulk",
DROP COLUMN "retail",
ADD COLUMN     "maxBulk" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "maxRetail" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "minBulk" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "minRetail" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "priceNote" TEXT;
