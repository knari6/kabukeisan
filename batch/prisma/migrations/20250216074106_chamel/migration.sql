/*
  Warnings:

  - You are about to drop the `cash_flows` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `debts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `depreciations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `financial_statements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profit_loss_statements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cash_flows` DROP FOREIGN KEY `cash_flows_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `debts` DROP FOREIGN KEY `debts_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `depreciations` DROP FOREIGN KEY `depreciations_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `financial_statements` DROP FOREIGN KEY `financial_statements_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `profit_loss_statements` DROP FOREIGN KEY `profit_loss_statements_statement_id_fkey`;

-- DropTable
DROP TABLE `cash_flows`;

-- DropTable
DROP TABLE `companies`;

-- DropTable
DROP TABLE `debts`;

-- DropTable
DROP TABLE `depreciations`;

-- DropTable
DROP TABLE `financial_statements`;

-- DropTable
DROP TABLE `profit_loss_statements`;

-- CreateTable
CREATE TABLE `Companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(5) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Companies_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinancialStatements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER NOT NULL,
    `year` VARCHAR(5) NOT NULL,
    `quarterType` ENUM('Q1', 'Q2', 'Q3', 'Q4', 'FY') NOT NULL,
    `stockAmount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `FinancialStatements_companyId_idx`(`companyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfitLossStatements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statementId` INTEGER NOT NULL,
    `sale` DECIMAL(15, 2) NULL,
    `netSale` DECIMAL(15, 2) NULL,
    `operatingIncome` DECIMAL(15, 2) NULL,
    `ordinaryIncome` DECIMAL(15, 2) NULL,
    `profitBeforeTax` DECIMAL(15, 2) NULL,
    `tax` DECIMAL(15, 2) NULL,
    `profit` DECIMAL(15, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProfitLossStatements_statementId_key`(`statementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CashFlows` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statementId` INTEGER NOT NULL,
    `operatingCf` DECIMAL(15, 2) NULL,
    `investingCf` DECIMAL(15, 2) NULL,
    `financialCf` DECIMAL(15, 2) NULL,
    `dividendPaid` DECIMAL(15, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CashFlows_statementId_key`(`statementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Depreciations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statementId` INTEGER NOT NULL,
    `depreciation` DECIMAL(15, 2) NULL,
    `amortization` DECIMAL(15, 2) NULL,
    `depreciationAmortization` DECIMAL(15, 2) NULL,
    `capitalExpenditure` DECIMAL(15, 2) NULL,
    `researchAndDevelopment` DECIMAL(15, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Depreciations_statementId_key`(`statementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Debts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statementId` INTEGER NOT NULL,
    `interestBearingDebt` DECIMAL(15, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Debts_statementId_key`(`statementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FinancialStatements` ADD CONSTRAINT `FinancialStatements_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfitLossStatements` ADD CONSTRAINT `ProfitLossStatements_statementId_fkey` FOREIGN KEY (`statementId`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashFlows` ADD CONSTRAINT `CashFlows_statementId_fkey` FOREIGN KEY (`statementId`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Depreciations` ADD CONSTRAINT `Depreciations_statementId_fkey` FOREIGN KEY (`statementId`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Debts` ADD CONSTRAINT `Debts_statementId_fkey` FOREIGN KEY (`statementId`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
