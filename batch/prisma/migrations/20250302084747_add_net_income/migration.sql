/*
  Warnings:

  - You are about to drop the column `net_profit` on the `ProfitLossStatement` table. All the data in the column will be lost.
  - Added the required column `net_income` to the `ProfitLossStatement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProfitLossStatement` DROP COLUMN `net_profit`,
    ADD COLUMN `net_income` DECIMAL(15, 2) NOT NULL;
