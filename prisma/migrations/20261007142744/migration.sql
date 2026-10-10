/*
  Warnings:

  - You are about to drop the column `SortOrder` on the `AccurateDescriptionContent` table. All the data in the column will be lost.
  - You are about to drop the column `SortOrder` on the `CompoundContent` table. All the data in the column will be lost.
  - Added the required column `NameCompound` to the `CompoundContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccurateDescriptionContent" DROP COLUMN "SortOrder";

-- AlterTable
ALTER TABLE "CompoundContent" DROP COLUMN "SortOrder",
ADD COLUMN     "NameCompound" TEXT NOT NULL;
