-- CreateTable
CREATE TABLE `companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(5) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `companies_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `financial_statements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_id` INTEGER NOT NULL,
    `year` VARCHAR(5) NOT NULL,
    `quarter_type` ENUM('Q1', 'Q2', 'Q3', 'Q4', 'FY') NOT NULL,
    `stock_amount` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `financial_statements_company_id_idx`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profit_loss_statements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `sale` DECIMAL(15, 2) NULL,
    `net_sale` DECIMAL(15, 2) NULL,
    `operating_income` DECIMAL(15, 2) NULL,
    `ordinary_income` DECIMAL(15, 2) NULL,
    `profit_before_tax` DECIMAL(15, 2) NULL,
    `tax` DECIMAL(15, 2) NULL,
    `profit` DECIMAL(15, 2) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profit_loss_statements_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cash_flows` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `operating_cf` DECIMAL(15, 2) NULL,
    `investing_cf` DECIMAL(15, 2) NULL,
    `financial_cf` DECIMAL(15, 2) NULL,
    `dividend_paid` DECIMAL(15, 2) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cash_flows_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `depreciations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `depreciation` DECIMAL(15, 2) NULL,
    `amortization` DECIMAL(15, 2) NULL,
    `depreciation_amortization` DECIMAL(15, 2) NULL,
    `capital_expenditure` DECIMAL(15, 2) NULL,
    `research_and_development` DECIMAL(15, 2) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `depreciations_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `debts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statement_id` INTEGER NOT NULL,
    `interest_bearing_debt` DECIMAL(15, 2) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `debts_statement_id_key`(`statement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `financial_statements` ADD CONSTRAINT `financial_statements_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profit_loss_statements` ADD CONSTRAINT `profit_loss_statements_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cash_flows` ADD CONSTRAINT `cash_flows_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `depreciations` ADD CONSTRAINT `depreciations_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `debts` ADD CONSTRAINT `debts_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
