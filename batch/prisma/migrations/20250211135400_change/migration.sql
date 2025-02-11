/*
  Warnings:

  - You are about to drop the column `non_current_liability` on the `AccountDatas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AccountDatas` DROP COLUMN `non_current_liability`,
    ADD COLUMN `fixed_liability` VARCHAR(20) NULL;
