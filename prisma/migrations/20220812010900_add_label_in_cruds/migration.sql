/*
  Warnings:

  - Added the required column `label` to the `cruds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cruds" ADD COLUMN     "label" TEXT NOT NULL;
