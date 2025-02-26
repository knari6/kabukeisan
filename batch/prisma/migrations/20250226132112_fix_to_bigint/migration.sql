/*
  Warnings:

  - The primary key for the `BalanceSheets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CashFlows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Companies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Debts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Depreciations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FinancialStatements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProfitLossStatements` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `BalanceSheets` DROP FOREIGN KEY `BalanceSheets_statementId_fkey`;

-- DropForeignKey
ALTER TABLE `CashFlows` DROP FOREIGN KEY `CashFlows_statementId_fkey`;

-- DropForeignKey
ALTER TABLE `Debts` DROP FOREIGN KEY `Debts_statementId_fkey`;

-- DropForeignKey
ALTER TABLE `Depreciations` DROP FOREIGN KEY `Depreciations_statementId_fkey`;

-- DropForeignKey
ALTER TABLE `FinancialStatements` DROP FOREIGN KEY `FinancialStatements_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `ProfitLossStatements` DROP FOREIGN KEY `ProfitLossStatements_statementId_fkey`;

-- AlterTable
ALTER TABLE `BalanceSheets` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `statementId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `CashFlows` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `statementId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Companies` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Debts` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `statementId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Depreciations` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `statementId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `FinancialStatements` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `companyId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ProfitLossStatements` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `statementId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `FinancialStatements` ADD CONSTRAINT `FinancialStatements_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BalanceSheets` ADD CONSTRAINT `BalanceSheets_statementId_fkey` FOREIGN KEY (`statementId`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfitLossStatements` ADD CONSTRAINT `ProfitLossStatements_statementId_fkey` FOREIGN KEY (`statementId`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashFlows` ADD CONSTRAINT `CashFlows_statementId_fkey` FOREIGN KEY (`statementId`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Depreciations` ADD CONSTRAINT `Depreciations_statementId_fkey` FOREIGN KEY (`statementId`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Debts` ADD CONSTRAINT `Debts_statementId_fkey` FOREIGN KEY (`statementId`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
