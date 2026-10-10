/*
  Warnings:

  - Added the required column `Code` to the `DetailedInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetailedInformation" ADD COLUMN     "Code" TEXT NOT NULL;
