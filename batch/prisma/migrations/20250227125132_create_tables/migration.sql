-- CreateTable
CREATE TABLE `ProfitLossStatement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `sales` DECIMAL(15, 2) NOT NULL,
    `gross_profit` DECIMAL(15, 2) NOT NULL,
    `operating_profit` DECIMAL(15, 2) NOT NULL,
    `ordinary_profit` DECIMAL(15, 2) NOT NULL,
    `profit_before_tax` DECIMAL(15, 2) NOT NULL,
    `tax` DECIMAL(15, 2) NOT NULL,
    `net_profit` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `ProfitLossStatement_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BalanceSheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `assets` DECIMAL(15, 2) NOT NULL,
    `current_assets` DECIMAL(15, 2) NOT NULL,
    `cash_and_deposits` DECIMAL(15, 2) NOT NULL,
    `accounts_receivable` DECIMAL(15, 2) NOT NULL,
    `merchandise_and_finished_goods` DECIMAL(15, 2) NOT NULL,
    `securities` DECIMAL(15, 2) NOT NULL,
    `inventory` DECIMAL(15, 2) NOT NULL,
    `other_current_assets` DECIMAL(15, 2) NOT NULL,
    `fixed_assets` DECIMAL(15, 2) NOT NULL,
    `tangible_fixed_assets` DECIMAL(15, 2) NOT NULL,
    `land` DECIMAL(15, 2) NOT NULL,
    `intangible_fixed_assets` DECIMAL(15, 2) NOT NULL,
    `investment_securities` DECIMAL(15, 2) NOT NULL,
    `other` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `BalanceSheet_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CashFlowStatement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `operating_cash_flow` DECIMAL(15, 2) NOT NULL,
    `investing_cash_flow` DECIMAL(15, 2) NOT NULL,
    `financing_cash_flow` DECIMAL(15, 2) NOT NULL,
    `cash_and_cash_equivalents` DECIMAL(15, 2) NOT NULL,
    `devidend_paid` DECIMAL(15, 2) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `CashFlowStatement_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Depreciation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `depreciation` DECIMAL(15, 2) NOT NULL,
    `amortization` DECIMAL(15, 2) NOT NULL,
    `depreciation_amortization` DECIMAL(15, 2) NOT NULL,
    `capital_expenditure` DECIMAL(15, 2) NOT NULL,
    `research_and_development` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `Depreciation_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DebtStatements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `interest_bearing_debt` DECIMAL(15, 2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `DebtStatements_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProfitLossStatement` ADD CONSTRAINT `ProfitLossStatement_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BalanceSheet` ADD CONSTRAINT `BalanceSheet_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashFlowStatement` ADD CONSTRAINT `CashFlowStatement_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Depreciation` ADD CONSTRAINT `Depreciation_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DebtStatements` ADD CONSTRAINT `DebtStatements_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
