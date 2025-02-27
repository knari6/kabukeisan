/*
  Warnings:

  - You are about to alter the column `stock_amount` on the `FinancialStatements` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `FinancialStatements` MODIFY `stock_amount` BIGINT NULL;
