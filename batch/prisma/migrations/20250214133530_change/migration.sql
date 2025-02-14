/*
  Warnings:

  - You are about to drop the column `security` on the `AccountDatas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AccountDatas` DROP COLUMN `security`,
    ADD COLUMN `securities` VARCHAR(20) NULL;
