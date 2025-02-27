/*
  Warnings:

  - Added the required column `stock_amount` to the `FinancialStatements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FinancialStatements` DROP COLUMN `stock_amount`,
    ADD COLUMN `stock_amount` DECIMAL(15, 2) NOT NULL;
