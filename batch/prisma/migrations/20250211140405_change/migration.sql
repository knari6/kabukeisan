/*
  Warnings:

  - You are about to drop the column `impairment_loss` on the `AccountDatas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AccountDatas` DROP COLUMN `impairment_loss`,
    ADD COLUMN `equipment_investment` VARCHAR(20) NULL;
