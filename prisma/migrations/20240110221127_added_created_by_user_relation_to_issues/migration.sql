/*
  Warnings:

  - Added the required column `createdByUserId` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `issue` ADD COLUMN `createdByUserId` VARCHAR(255) NOT NULL;
