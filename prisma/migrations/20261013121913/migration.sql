/*
  Warnings:

  - You are about to drop the column `imageProduct` on the `DetailedInformation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DetailedInformation" DROP COLUMN "imageProduct";

-- CreateTable
CREATE TABLE "productImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "detailedInformationId" INTEGER,

    CONSTRAINT "productImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productImage" ADD CONSTRAINT "productImage_detailedInformationId_fkey" FOREIGN KEY ("detailedInformationId") REFERENCES "DetailedInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
