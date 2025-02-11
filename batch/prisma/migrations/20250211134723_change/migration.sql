/*
  Warnings:

  - You are about to drop the column `long_term_security` on the `AccountDatas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AccountDatas` DROP COLUMN `long_term_security`,
    ADD COLUMN `debt` VARCHAR(20) NULL,
    ADD COLUMN `intangible_fixed_asset` VARCHAR(20) NULL,
    ADD COLUMN `land` VARCHAR(20) NULL,
    ADD COLUMN `tangible_fixed_asset` VARCHAR(20) NULL;
