/*
  Warnings:

  - The values [шт,кг,м,палеты] on the enum `Unit` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Unit_new" AS ENUM ('PIECE', 'KG', 'METER', 'PALLET');
ALTER TABLE "public"."CatalogProviders" ALTER COLUMN "UnitOfMeasurement" DROP DEFAULT;
ALTER TABLE "CatalogProviders" ALTER COLUMN "UnitOfMeasurement" TYPE "Unit_new" USING ("UnitOfMeasurement"::text::"Unit_new");
ALTER TYPE "Unit" RENAME TO "Unit_old";
ALTER TYPE "Unit_new" RENAME TO "Unit";
DROP TYPE "public"."Unit_old";
ALTER TABLE "CatalogProviders" ALTER COLUMN "UnitOfMeasurement" SET DEFAULT 'PIECE';
COMMIT;

-- AlterTable
ALTER TABLE "CatalogProviders" ALTER COLUMN "UnitOfMeasurement" SET DEFAULT 'PIECE';
