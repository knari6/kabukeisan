/*
  Warnings:

  - You are about to drop the column `statement_id` on the `balance_sheets` table. All the data in the column will be lost.
  - You are about to drop the column `statement_id` on the `capital_expenditures` table. All the data in the column will be lost.
  - You are about to drop the column `statement_id` on the `cash_flow_statements` table. All the data in the column will be lost.
  - You are about to drop the column `fiscal_year` on the `companies` table. All the data in the column will be lost.
  - You are about to alter the column `code` on the `companies` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(4)`.
  - You are about to drop the column `statement_id` on the `debt_statements` table. All the data in the column will be lost.
  - You are about to drop the column `statement_id` on the `profit_loss_statements` table. All the data in the column will be lost.
  - You are about to drop the `financial_statements` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[company_id]` on the table `balance_sheets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_id]` on the table `capital_expenditures` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_id]` on the table `cash_flow_statements` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code,year,quarter_type]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_id]` on the table `debt_statements` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_id]` on the table `profit_loss_statements` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `balance_sheets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `capital_expenditures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `cash_flow_statements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quarter_type` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_amount` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `debt_statements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `profit_loss_statements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `balance_sheets` DROP FOREIGN KEY `balance_sheets_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `capital_expenditures` DROP FOREIGN KEY `capital_expenditures_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `cash_flow_statements` DROP FOREIGN KEY `cash_flow_statements_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `debt_statements` DROP FOREIGN KEY `debt_statements_statement_id_fkey`;

-- DropForeignKey
ALTER TABLE `financial_statements` DROP FOREIGN KEY `financial_statements_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `profit_loss_statements` DROP FOREIGN KEY `profit_loss_statements_statement_id_fkey`;

-- DropIndex
DROP INDEX `balance_sheets_statement_id_key` ON `balance_sheets`;

-- DropIndex
DROP INDEX `capital_expenditures_statement_id_key` ON `capital_expenditures`;

-- DropIndex
DROP INDEX `cash_flow_statements_statement_id_key` ON `cash_flow_statements`;

-- DropIndex
DROP INDEX `companies_code_fiscal_year_idx` ON `companies`;

-- DropIndex
DROP INDEX `companies_code_fiscal_year_key` ON `companies`;

-- DropIndex
DROP INDEX `debt_statements_statement_id_key` ON `debt_statements`;

-- DropIndex
DROP INDEX `profit_loss_statements_statement_id_key` ON `profit_loss_statements`;

-- AlterTable
ALTER TABLE `balance_sheets` DROP COLUMN `statement_id`,
    ADD COLUMN `company_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `capital_expenditures` DROP COLUMN `statement_id`,
    ADD COLUMN `company_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `cash_flow_statements` DROP COLUMN `statement_id`,
    ADD COLUMN `company_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `companies` DROP COLUMN `fiscal_year`,
    ADD COLUMN `quarter_type` VARCHAR(2) NOT NULL,
    ADD COLUMN `stock_amount` INTEGER NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL,
    MODIFY `code` VARCHAR(4) NOT NULL,
    MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `debt_statements` DROP COLUMN `statement_id`,
    ADD COLUMN `company_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `profit_loss_statements` DROP COLUMN `statement_id`,
    ADD COLUMN `company_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `financial_statements`;

-- CreateIndex
CREATE UNIQUE INDEX `balance_sheets_company_id_key` ON `balance_sheets`(`company_id`);

-- CreateIndex
CREATE UNIQUE INDEX `capital_expenditures_company_id_key` ON `capital_expenditures`(`company_id`);

-- CreateIndex
CREATE UNIQUE INDEX `cash_flow_statements_company_id_key` ON `cash_flow_statements`(`company_id`);

-- CreateIndex
CREATE INDEX `companies_code_year_idx` ON `companies`(`code`, `year`);

-- CreateIndex
CREATE UNIQUE INDEX `companies_code_year_quarter_type_key` ON `companies`(`code`, `year`, `quarter_type`);

-- CreateIndex
CREATE UNIQUE INDEX `debt_statements_company_id_key` ON `debt_statements`(`company_id`);

-- CreateIndex
CREATE UNIQUE INDEX `profit_loss_statements_company_id_key` ON `profit_loss_statements`(`company_id`);

-- AddForeignKey
ALTER TABLE `profit_loss_statements` ADD CONSTRAINT `profit_loss_statements_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `balance_sheets` ADD CONSTRAINT `balance_sheets_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cash_flow_statements` ADD CONSTRAINT `cash_flow_statements_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capital_expenditures` ADD CONSTRAINT `capital_expenditures_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `debt_statements` ADD CONSTRAINT `debt_statements_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
