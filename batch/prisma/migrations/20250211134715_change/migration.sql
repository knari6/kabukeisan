/*
  Warnings:

  - You are about to drop the column `non_current_asset` on the `AccountDatas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AccountDatas` DROP COLUMN `non_current_asset`,
    ADD COLUMN `fixed_asset` VARCHAR(20) NULL,
    ADD COLUMN `merchandise_and_finished_goods` VARCHAR(20) NULL;
