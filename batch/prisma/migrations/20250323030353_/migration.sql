-- AlterTable
ALTER TABLE `balance_sheets` ADD COLUMN `debt` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `fixed_liability` DECIMAL(15, 2) NOT NULL DEFAULT 0;
