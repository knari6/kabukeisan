/*
  Warnings:

  - You are about to drop the column `bond` on the `AccountDatas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AccountDatas` DROP COLUMN `bond`,
    ADD COLUMN `net_assets` VARCHAR(20) NULL;
