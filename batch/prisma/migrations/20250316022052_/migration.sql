/*
  Warnings:

  - Added the required column `fiscal_year` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `companies_code_idx` ON `companies`;

-- AlterTable
ALTER TABLE `companies` ADD COLUMN `fiscal_year` VARCHAR(4) NOT NULL;

-- CreateIndex
CREATE INDEX `companies_code_fiscal_year_idx` ON `companies`(`code`, `fiscal_year`);
