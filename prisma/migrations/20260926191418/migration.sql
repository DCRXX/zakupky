/*
  Warnings:

  - You are about to drop the column `providersId` on the `CatalogProviders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CatalogProviders" DROP CONSTRAINT "CatalogProviders_providersId_fkey";

-- DropIndex
DROP INDEX "CatalogProviders_providersId_idx";

-- AlterTable
ALTER TABLE "CatalogProviders" DROP COLUMN "providersId",
ADD COLUMN     "providerId" INTEGER;

-- AlterTable
ALTER TABLE "provider" ALTER COLUMN "SupplierEvaluation" SET DEFAULT 0,
ALTER COLUMN "NumberPhone" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "CatalogProviders_providerId_idx" ON "CatalogProviders"("providerId");

-- AddForeignKey
ALTER TABLE "CatalogProviders" ADD CONSTRAINT "CatalogProviders_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
