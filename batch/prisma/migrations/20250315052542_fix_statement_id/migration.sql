/*
  Warnings:

  - You are about to drop the column `statements_id` on the `balance_sheets` table. All the data in the column will be lost.
  - You are about to drop the column `statements_id` on the `profit_loss_statements` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[statement_id]` on the table `balance_sheets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[statement_id]` on the table `profit_loss_statements` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `statement_id` to the `balance_sheets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statement_id` to the `profit_loss_statements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `balance_sheets` DROP FOREIGN KEY `balance_sheets_statements_id_fkey`;

-- DropForeignKey
ALTER TABLE `profit_loss_statements` DROP FOREIGN KEY `profit_loss_statements_statements_id_fkey`;

-- DropIndex
DROP INDEX `balance_sheets_statements_id_key` ON `balance_sheets`;

-- DropIndex
DROP INDEX `profit_loss_statements_statements_id_key` ON `profit_loss_statements`;

-- AlterTable
ALTER TABLE `balance_sheets` DROP COLUMN `statements_id`,
    ADD COLUMN `statement_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `profit_loss_statements` DROP COLUMN `statements_id`,
    ADD COLUMN `statement_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `balance_sheets_statement_id_key` ON `balance_sheets`(`statement_id`);

-- CreateIndex
CREATE UNIQUE INDEX `profit_loss_statements_statement_id_key` ON `profit_loss_statements`(`statement_id`);

-- AddForeignKey
ALTER TABLE `profit_loss_statements` ADD CONSTRAINT `profit_loss_statements_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `balance_sheets` ADD CONSTRAINT `balance_sheets_statement_id_fkey` FOREIGN KEY (`statement_id`) REFERENCES `financial_statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
