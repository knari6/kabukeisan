/*
  Warnings:

  - You are about to drop the column `stock_amounts` on the `financial_statements` table. All the data in the column will be lost.
  - You are about to drop the `ProfitLossStatement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `balance_sheet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stock_amount` to the `financial_statements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ProfitLossStatement` DROP FOREIGN KEY `ProfitLossStatement_statements_id_fkey`;

-- DropForeignKey
ALTER TABLE `balance_sheet` DROP FOREIGN KEY `balance_sheet_statements_id_fkey`;

-- AlterTable
ALTER TABLE `financial_statements` DROP COLUMN `stock_amounts`,
    ADD COLUMN `stock_amount` DECIMAL(15, 2) NOT NULL;

-- DropTable
DROP TABLE `ProfitLossStatement`;

-- DropTable
DROP TABLE `balance_sheet`;

-- CreateTable
CREATE TABLE `profit_loss_statements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statements_id` INTEGER NOT NULL,
    `sale` DECIMAL(15, 2) NOT NULL,
    `gross_profit` DECIMAL(15, 2) NOT NULL,
    `operating_profit` DECIMAL(15, 2) NOT NULL,
    `ordinary_profit` DECIMAL(15, 2) NOT NULL,
    `profit_before_tax` DECIMAL(15, 2) NOT NULL,
    `tax` DECIMAL(15, 2) NOT NULL,
    `net_income` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `profit_loss_statements_statements_id_key`(`statements_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `balance_sheets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statements_id` INTEGER NOT NULL,
    `asset` DECIMAL(15, 2) NOT NULL,
    `current_asset` DECIMAL(15, 2) NOT NULL,
    `cash_and_deposit` DECIMAL(15, 2) NOT NULL,
    `accounts_receivable` DECIMAL(15, 2) NOT NULL,
    `merchandise_and_finished_good` DECIMAL(15, 2) NOT NULL,
    `security` DECIMAL(15, 2) NOT NULL,
    `inventory` DECIMAL(15, 2) NOT NULL,
    `other_current_asset` DECIMAL(15, 2) NOT NULL,
    `fixed_asset` DECIMAL(15, 2) NOT NULL,
    `tangible_fixed_asset` DECIMAL(15, 2) NOT NULL,
    `land` DECIMAL(15, 2) NOT NULL,
    `intangible_fixed_asset` DECIMAL(15, 2) NOT NULL,
    `investment_security` DECIMAL(15, 2) NOT NULL,
    `other_asset` DECIMAL(15, 2) NOT NULL,
    `liability` DECIMAL(15, 2) NOT NULL,
    `current_liability` DECIMAL(15, 2) NOT NULL,
    `accounts_payable` DECIMAL(15, 2) NOT NULL,
    `other_current_liability` DECIMAL(15, 2) NOT NULL,
    `other_liability` DECIMAL(15, 2) NOT NULL,
    `net_asset` DECIMAL(15, 2) NOT NULL,
    `equity` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `balance_sheets_statements_id_key`(`statements_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profit_loss_statements` ADD CONSTRAINT `profit_loss_statements_statements_id_fkey` FOREIGN KEY (`statements_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `balance_sheets` ADD CONSTRAINT `balance_sheets_statements_id_fkey` FOREIGN KEY (`statements_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
