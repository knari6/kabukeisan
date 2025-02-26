/*
  Warnings:

  - You are about to drop the `companies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `companies`;

-- CreateTable
CREATE TABLE `FinancialStatements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_id` INTEGER NOT NULL,
    `fiscal_year` VARCHAR(4) NOT NULL,
    `quarter_type` VARCHAR(191) NOT NULL,
    `stock_amount` BIGINT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `FinancialStatements_company_id_fiscal_year_quarter_type_key`(`company_id`, `fiscal_year`, `quarter_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `Companies_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FinancialStatements` ADD CONSTRAINT `FinancialStatements_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
