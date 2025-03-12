/*
  Warnings:

  - You are about to drop the `BalanceSheet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CashFlowStatement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DebtStatements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Depreciation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FinancialStatements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `BalanceSheet` DROP FOREIGN KEY `BalanceSheet_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `CashFlowStatement` DROP FOREIGN KEY `CashFlowStatement_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `DebtStatements` DROP FOREIGN KEY `DebtStatements_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `Depreciation` DROP FOREIGN KEY `Depreciation_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `FinancialStatements` DROP FOREIGN KEY `FinancialStatements_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProfitLossStatement` DROP FOREIGN KEY `ProfitLossStatement_statement_id_fkey`;

-- DropTable
DROP TABLE `BalanceSheet`;

-- DropTable
DROP TABLE `CashFlowStatement`;

-- DropTable
DROP TABLE `Companies`;

-- DropTable
DROP TABLE `DebtStatements`;

-- DropTable
DROP TABLE `Depreciation`;

-- DropTable
DROP TABLE `FinancialStatements`;

-- CreateTable
CREATE TABLE `financial_statements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_id` INTEGER NOT NULL,
    `fiscal_year` VARCHAR(4) NOT NULL,
    `quarter_type` VARCHAR(191) NOT NULL,
    `stock_amount` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    INDEX `financial_statements_fiscal_year_quarter_type_idx`(`fiscal_year`, `quarter_type`),
    UNIQUE INDEX `financial_statements_company_id_fiscal_year_quarter_type_key`(`company_id`, `fiscal_year`, `quarter_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `companies_code_key`(`code`),
    INDEX `companies_code_idx`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `balance_sheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `assets` DECIMAL(15, 2) NOT NULL,
    `current_assets` DECIMAL(15, 2) NOT NULL,
    `cash_and_deposits` DECIMAL(15, 2) NOT NULL,
    `accounts_receivable` DECIMAL(15, 2) NOT NULL,
    `merchandise_and_finished_goods` DECIMAL(15, 2) NOT NULL,
    `securities` DECIMAL(15, 2) NOT NULL,
    `inventories` DECIMAL(15, 2) NOT NULL,
    `other_current_assets` DECIMAL(15, 2) NOT NULL,
    `fixed_assets` DECIMAL(15, 2) NOT NULL,
    `tangible_fixed_assets` DECIMAL(15, 2) NOT NULL,
    `lands` DECIMAL(15, 2) NOT NULL,
    `intangible_fixed_assets` DECIMAL(15, 2) NOT NULL,
    `investment_securities` DECIMAL(15, 2) NOT NULL,
    `other_assets` DECIMAL(15, 2) NOT NULL,
    `liabilities` DECIMAL(15, 2) NOT NULL,
    `current_liabilities` DECIMAL(15, 2) NOT NULL,
    `accounts_payables` DECIMAL(15, 2) NOT NULL,
    `other_current_liabilities` DECIMAL(15, 2) NOT NULL,
    `other_liabilities` DECIMAL(15, 2) NOT NULL,
    `net_assets` DECIMAL(15, 2) NOT NULL,
    `equity` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `balance_sheet_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cash_flow_statement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `operating_cash_flow` DECIMAL(15, 2) NOT NULL,
    `investing_cash_flow` DECIMAL(15, 2) NOT NULL,
    `financing_cash_flow` DECIMAL(15, 2) NOT NULL,
    `cash_and_cash_equivalents` DECIMAL(15, 2) NOT NULL,
    `devidend_paid` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `cash_flow_statement_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capital_expenditure` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `depreciation` DECIMAL(15, 2) NOT NULL,
    `amortization` DECIMAL(15, 2) NOT NULL,
    `depreciation_amortization` DECIMAL(15, 2) NOT NULL,
    `capital_expenditure` DECIMAL(15, 2) NOT NULL,
    `research_and_development` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `capital_expenditure_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `debt_statements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `interest_bearing_debt` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `debt_statements_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `financial_statements` ADD CONSTRAINT `financial_statements_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfitLossStatement` ADD CONSTRAINT `ProfitLossStatement_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `balance_sheet` ADD CONSTRAINT `balance_sheet_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cash_flow_statement` ADD CONSTRAINT `cash_flow_statement_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capital_expenditure` ADD CONSTRAINT `capital_expenditure_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `debt_statements` ADD CONSTRAINT `debt_statements_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
