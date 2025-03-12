/*
  Warnings:

  - You are about to drop the column `statement_id` on the `ProfitLossStatement` table. All the data in the column will be lost.
  - You are about to drop the column `accounts_payables` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `assets` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `cash_and_deposits` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `current_assets` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `current_liabilities` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `fixed_assets` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `intangible_fixed_assets` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `inventories` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `investment_securities` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `lands` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `liabilities` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `merchandise_and_finished_goods` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `net_assets` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `other_assets` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `other_current_assets` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `other_current_liabilities` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `other_liabilities` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `securities` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `statement_id` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `tangible_fixed_assets` on the `balance_sheet` table. All the data in the column will be lost.
  - You are about to drop the column `interest_bearing_debt` on the `debt_statements` table. All the data in the column will be lost.
  - You are about to drop the column `stock_amount` on the `financial_statements` table. All the data in the column will be lost.
  - You are about to drop the `capital_expenditure` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cash_flow_statement` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[statements_id]` on the table `ProfitLossStatement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[statements_id]` on the table `balance_sheet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `statements_id` to the `ProfitLossStatement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accounts_payable` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `asset` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cash_and_deposit` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_asset` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_liability` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fixed_asset` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intangible_fixed_asset` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventory` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investment_security` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `land` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liability` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchandise_and_finished_good` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `net_asset` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `other_asset` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `other_current_asset` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `other_current_liability` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `other_liability` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `security` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statements_id` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tangible_fixed_asset` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interest_bearing_debts` to the `debt_statements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_amounts` to the `financial_statements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ProfitLossStatement` DROP FOREIGN KEY `ProfitLossStatement_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `balance_sheet` DROP FOREIGN KEY `balance_sheet_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `capital_expenditure` DROP FOREIGN KEY `capital_expenditure_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `cash_flow_statement` DROP FOREIGN KEY `cash_flow_statement_statement_id_fkey`;

-- DropIndex
DROP INDEX `ProfitLossStatement_statement_id_key` ON `ProfitLossStatement`;

-- DropIndex
DROP INDEX `balance_sheet_statement_id_key` ON `balance_sheet`;

-- AlterTable
ALTER TABLE `ProfitLossStatement` DROP COLUMN `statement_id`,
    ADD COLUMN `statements_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `balance_sheet` DROP COLUMN `accounts_payables`,
    DROP COLUMN `assets`,
    DROP COLUMN `cash_and_deposits`,
    DROP COLUMN `current_assets`,
    DROP COLUMN `current_liabilities`,
    DROP COLUMN `fixed_assets`,
    DROP COLUMN `intangible_fixed_assets`,
    DROP COLUMN `inventories`,
    DROP COLUMN `investment_securities`,
    DROP COLUMN `lands`,
    DROP COLUMN `liabilities`,
    DROP COLUMN `merchandise_and_finished_goods`,
    DROP COLUMN `net_assets`,
    DROP COLUMN `other_assets`,
    DROP COLUMN `other_current_assets`,
    DROP COLUMN `other_current_liabilities`,
    DROP COLUMN `other_liabilities`,
    DROP COLUMN `securities`,
    DROP COLUMN `statement_id`,
    DROP COLUMN `tangible_fixed_assets`,
    ADD COLUMN `accounts_payable` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `asset` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `cash_and_deposit` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `current_asset` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `current_liability` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `fixed_asset` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `intangible_fixed_asset` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `inventory` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `investment_security` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `land` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `liability` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `merchandise_and_finished_good` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `net_asset` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `other_asset` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `other_current_asset` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `other_current_liability` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `other_liability` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `security` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `statements_id` INTEGER NOT NULL,
    ADD COLUMN `tangible_fixed_asset` DECIMAL(15, 2) NOT NULL;

-- AlterTable
ALTER TABLE `debt_statements` DROP COLUMN `interest_bearing_debt`,
    ADD COLUMN `interest_bearing_debts` DECIMAL(15, 2) NOT NULL;

-- AlterTable
ALTER TABLE `financial_statements` DROP COLUMN `stock_amount`,
    ADD COLUMN `stock_amounts` DECIMAL(15, 2) NOT NULL;

-- DropTable
DROP TABLE `capital_expenditure`;

-- DropTable
DROP TABLE `cash_flow_statement`;

-- CreateTable
CREATE TABLE `cash_flow_statements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `operating_cash_flow` DECIMAL(15, 2) NOT NULL,
    `investing_cash_flow` DECIMAL(15, 2) NOT NULL,
    `financing_cash_flow` DECIMAL(15, 2) NOT NULL,
    `cash_and_cash_equivalent` DECIMAL(15, 2) NOT NULL,
    `dividend_paid` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `cash_flow_statements_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capital_expenditures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `depreciation` DECIMAL(15, 2) NOT NULL,
    `amortization` DECIMAL(15, 2) NOT NULL,
    `depreciation_amortization` DECIMAL(15, 2) NOT NULL,
    `capital_expenditure` DECIMAL(15, 2) NOT NULL,
    `research_and_development` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `capital_expenditures_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ProfitLossStatement_statements_id_key` ON `ProfitLossStatement`(`statements_id`);

-- CreateIndex
CREATE UNIQUE INDEX `balance_sheet_statements_id_key` ON `balance_sheet`(`statements_id`);

-- AddForeignKey
ALTER TABLE `ProfitLossStatement` ADD CONSTRAINT `ProfitLossStatement_statements_id_fkey` FOREIGN KEY (`statements_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `balance_sheet` ADD CONSTRAINT `balance_sheet_statements_id_fkey` FOREIGN KEY (`statements_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cash_flow_statements` ADD CONSTRAINT `cash_flow_statements_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capital_expenditures` ADD CONSTRAINT `capital_expenditures_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
