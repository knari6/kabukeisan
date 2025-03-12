/*
  Warnings:

  - You are about to drop the column `inventory` on the `BalanceSheet` table. All the data in the column will be lost.
  - You are about to drop the column `land` on the `BalanceSheet` table. All the data in the column will be lost.
  - You are about to drop the column `other` on the `BalanceSheet` table. All the data in the column will be lost.
  - Added the required column `accounts_payables` to the `BalanceSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_liabilities` to the `BalanceSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equity` to the `BalanceSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventories` to the `BalanceSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lands` to the `BalanceSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liabilities` to the `BalanceSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `net_assets` to the `BalanceSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `other_assets` to the `BalanceSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `other_current_liabilities` to the `BalanceSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `other_liabilities` to the `BalanceSheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BalanceSheet` DROP COLUMN `inventory`,
    DROP COLUMN `land`,
    DROP COLUMN `other`,
    ADD COLUMN `accounts_payables` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `current_liabilities` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `equity` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `inventories` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `lands` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `liabilities` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `net_assets` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `other_assets` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `other_current_liabilities` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `other_liabilities` DECIMAL(15, 2) NOT NULL;

-- CreateIndex
CREATE INDEX `Companies_code_idx` ON `Companies`(`code`);

-- CreateIndex
CREATE INDEX `FinancialStatements_fiscal_year_quarter_type_idx` ON `FinancialStatements`(`fiscal_year`, `quarter_type`);
