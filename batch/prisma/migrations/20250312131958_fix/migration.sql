/*
  Warnings:

  - You are about to drop the column `interest_bearing_debts` on the `debt_statements` table. All the data in the column will be lost.
  - Added the required column `interest_bearing_debt` to the `debt_statements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `debt_statements` DROP COLUMN `interest_bearing_debts`,
    ADD COLUMN `interest_bearing_debt` DECIMAL(15, 2) NOT NULL;
